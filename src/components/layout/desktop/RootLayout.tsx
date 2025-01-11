import React, { useRef, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current || !contentRef.current) return;
      const container = containerRef.current.getBoundingClientRect();
      const content = contentRef.current.getBoundingClientRect();

      // Calculate a scale factor that fits content inside container
      const scaleX = container.width / content.width;
      const scaleY = container.height / content.height;
      // Whichever is smaller ensures both dimensions fit
      const newScale = Math.min(scaleX, scaleY, 1); // cap at 1 so it doesn't blow up content if container is bigger
      setScale(newScale);
    }

    // Initial + on resize
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden bg-gray-200 flex flex-col items-center justify-center"
    >
      <div
        ref={contentRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
