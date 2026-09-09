import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#1e3a5f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="120" height="120" viewBox="0 0 48 48">
        <path
          d="M24 5 29.4 15.2 40.8 17.3 38.5 28.6 46 33.9 36.6 39.4 35.4 50.8 24 47.5 12.6 50.8 11.4 39.4 2 33.9 9.5 28.6 7.2 17.3 18.6 15.2Z"
          fill="none"
          stroke="#d8a24a"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="27" r="4.4" fill="#d8a24a" />
      </svg>
    </div>,
    size,
  );
}
