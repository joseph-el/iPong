import "./ProgressBar.css";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div
      className="range here "
      style={{ "--p": progress } as React.CSSProperties}
    >
      <div className="range__label"></div>
    </div>
  );
}
