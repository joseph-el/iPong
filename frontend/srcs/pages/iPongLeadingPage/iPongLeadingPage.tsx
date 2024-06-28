import clsx from "clsx";

import { useAdaptedValue } from "../../hooks/common/useAdaptedValue";
import { useNavigate } from "react-router-dom";
import styles from "./LoadingOverlay.module.scss";
import { useState } from "react";
import React, { useEffect } from "react";

import styles1 from "./SideLine.module.scss";

interface LineProps {
  mirror?: boolean;
}

export function SideLine({ mirror }: LineProps) {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handler = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handler);
    handler();
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  const offset_top = useAdaptedValue(40, 30, 20);
  const corner_bend = useAdaptedValue(15, 10, 7);
  const offset_left = useAdaptedValue(60, 20, 10);
  const center = height / 2;
  const center_height = 30;
  const center_corner = 10;
  const dot_offset = 1;

  const linePath = `
    M ${offset_left + corner_bend * 2} ${offset_top}
    L ${offset_left + corner_bend} ${offset_top}
    L ${offset_left} ${offset_top + corner_bend}
    L ${offset_left} ${center - center_height}
    L ${offset_left + center_corner} ${center - center_height + center_corner}
    L ${offset_left + center_corner} ${center + center_height - center_corner}
    L ${offset_left} ${center + center_height}
    L ${offset_left} ${height - offset_top - corner_bend}
    L ${offset_left + corner_bend} ${height - offset_top}
    L ${offset_left + corner_bend * 2} ${height - offset_top}
  `;
  const dotPath = `
    M ${offset_left + dot_offset} ${center - 15}
    L ${offset_left + dot_offset + 2} ${center - 13}
    L ${offset_left + dot_offset + 2} ${center + 13}
    L ${offset_left + dot_offset} ${center + 15}
  `;

  return (
    <svg className={clsx(styles1.line, mirror && styles1.mirror)}>
      <path
        d={linePath}
        stroke={"#fff"}
        fill={"none"}
        opacity={0.4}
        strokeWidth={1}
      />
      <path d={dotPath} stroke={"none"} fill={"#00FF19"} />
    </svg>
  );
}

export default function iPongLeadingPage() {
  const navigate = useNavigate();

  if (localStorage.getItem("isLoaded") !== null) {
    // navigate("/Auth");
  }

  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ringSize = useAdaptedValue(240, 240, 240);
  const strokeLength = (ringSize - 4) * Math.PI;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setLoaded(true);
          clearInterval(interval);
          setTimeout(() => setHidden(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const onClickEnter = () => {
    document.body.classList.add('overlay-transition');

    // Delay the navigation using setTimeout
    setTimeout(() => {
      localStorage.setItem("isLoaded", "true");
      navigate("/Auth");
    }, 800); // Adjust timing as needed to match your transition timing
  
    // Optionally, you can remove the transition class after a delay
    setTimeout(() => {
      document.body.classList.remove('overlay-transition');
    }, 1200); // Adjust timing accordingly
  };

  const onClickNoSound = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <div>
        <div className={clsx(styles.overlay, hidden && styles.hidden)}>
          <div
            className={clsx(styles.overlay__center, loaded && styles.active)}
            onClick={onClickEnter}
            style={
              {
                "--ring-size": `${ringSize}px`,
              } as React.CSSProperties
            }
          >
            <svg className={clsx(styles.progress, loaded && styles.hidden)}>
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringSize / 2 - 2}
                stroke={"rgba(255, 255, 255, 0.4)"}
              />
              <circle
                className={styles.progress__bar}
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringSize / 2 - 2}
                stroke={"var(--progress-stroke)"}
                strokeDasharray={`${
                  (strokeLength * progress) / 100
                } ${strokeLength}`}
              />
            </svg>
            <div className={clsx(styles.logo, loaded && styles.hidden)}>
              <svg>
                <path
                  d="M17 13V1c-1.973 11.1506-5.4751 14.2859-16 16h32c-10.5597 1.8589-13.8397 5.5133-16 16V21"
                  stroke={"#fff"}
                  strokeWidth={2}
                />
              </svg>
            </div>
            <div className={clsx(styles.title, !loaded && styles.hidden)}>
              <span>Enter</span> iPong <br /> Arena
            </div>
          </div>

          <div
            className={clsx(styles.overlay__footer, !loaded && styles.hidden)}
          >
            {/* <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.3">
            <path
              d="M33 27V17C33 8.16344 25.8366 1 17 1V1C8.16344 1 1 8.16344 1 17V27"
              stroke="white"
              strokeLinecap="round"
            />
            <path
              d="M1 24C1 20.6863 3.68629 18 7 18V18C8.10457 18 9 18.8954 9 20V31C9 32.1046 8.10457 33 7 33V33C3.68629 33 1 30.3137 1 27V24Z"
              stroke="white"
            />
            <path
              d="M25 20C25 18.8954 25.8954 18 27 18V18C30.3137 18 33 20.6863 33 24V27C33 30.3137 30.3137 33 27 33V33C25.8954 33 25 32.1046 25 31V20Z"
              stroke="white"
            />
          </g>
        </svg> */}
            <p>
              Ready to play iPong? Let's begin!
              <br />
              <a href="#" >
                Click here to start.
              </a>
            </p>
          </div>
        </div>
        <SideLine />
        <SideLine mirror />
      </div>
    </>
  );
}
