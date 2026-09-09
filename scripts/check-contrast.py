#!/usr/bin/env python3
"""WCAG 2.x contrast checker for the HRC design system.

Pure standard library. Re-run whenever a primitive colour changes:

    python scripts/check-contrast.py

Thresholds: text 4.5:1 · large text / UI / graphics 3:1 · AAA 7:1.
Source of truth for the matrix in docs/design/05-accessibility-standards.md.
"""
from __future__ import annotations


def _linear(channel: float) -> float:
    c = channel / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def relative_luminance(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _linear(r) + 0.7152 * _linear(g) + 0.0722 * _linear(b)


def contrast_ratio(fg: str, bg: str) -> float:
    l1, l2 = relative_luminance(fg), relative_luminance(bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def verdict(ratio: float) -> str:
    if ratio >= 7:
        return "AAA"
    if ratio >= 4.5:
        return "AA"
    if ratio >= 3:
        return "AA-large/UI"
    return "FAIL"


# --- Palette (keep in sync with docs/design/02-design-tokens.md §1.1) ---
PALETTE = {
    "navy-500": "#1E3A5F", "navy-600": "#1A324F", "navy-900": "#0A1420",
    "ink": "#0F172A",
    "blue-600": "#1D4ED8",
    "bronze-500": "#A16207", "bronze-600": "#854D0E", "bronze-700": "#713F12",
    "slate-50": "#F8FAFC", "slate-100": "#F1F5F9", "slate-200": "#E9EEF5",
    "slate-300": "#CBD5E1", "slate-500": "#64748B", "slate-600": "#475569",
    "white": "#FFFFFF",
    "green-700": "#15803D", "red-600": "#DC2626", "amber-600": "#D97706",
    "amber-700": "#B45309",
    "d-bg": "#0A1420", "d-surface": "#0F1E30", "d-surface-muted": "#14283F",
    "d-text": "#E7ECF3", "d-text-muted": "#A9B6C6", "d-heading": "#F2F5F9",
    "d-link": "#7CA9FF", "d-primary": "#3D6099", "d-accent": "#D8A24A",
    "d-border-interactive": "#647CA6", "d-border-divider": "#24374F",
}

# (foreground, background, intent) — intent in {text, large, ui}
PAIRS = {
    "LIGHT": [
        ("ink", "slate-50", "text"), ("ink", "white", "text"),
        ("slate-600", "white", "text"), ("navy-500", "white", "text"),
        ("bronze-600", "white", "text"), ("bronze-600", "slate-50", "text"),
        ("white", "navy-500", "text"), ("white", "bronze-600", "text"),
        ("bronze-500", "white", "large"),
        ("slate-500", "white", "ui"), ("blue-600", "white", "ui"),
        ("green-700", "white", "text"), ("red-600", "white", "text"),
        ("amber-700", "white", "text"), ("amber-600", "white", "large"),
    ],
    "DARK": [
        ("d-text", "d-bg", "text"), ("d-text", "d-surface", "text"),
        ("d-text-muted", "d-bg", "text"), ("d-heading", "d-bg", "text"),
        ("d-link", "d-bg", "text"), ("d-link", "d-surface", "text"),
        ("d-text", "d-primary", "text"), ("navy-900", "d-accent", "text"),
        ("d-border-interactive", "d-bg", "ui"),
        ("d-border-interactive", "d-surface-muted", "ui"),
        ("d-link", "d-bg", "ui"),
    ],
}

THRESHOLD = {"text": 4.5, "large": 3.0, "ui": 3.0}


def main() -> int:
    failures = 0
    for theme, pairs in PAIRS.items():
        print(f"\n=== {theme} THEME ===")
        print(f"{'foreground':>22} on {'background':<18} {'ratio':>6}  {'verdict':<12} intent")
        print("-" * 74)
        for fg, bg, intent in pairs:
            r = contrast_ratio(PALETTE[fg], PALETTE[bg])
            ok = r >= THRESHOLD[intent]
            mark = "" if ok else "   <-- BELOW THRESHOLD"
            if not ok:
                failures += 1
            print(f"{fg:>22} on {bg:<18} {r:6.2f}  {verdict(r):<12} [{intent}]{mark}")
    print(f"\n{failures} pair(s) below their intended threshold.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
