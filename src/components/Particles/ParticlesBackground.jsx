"use client";
import React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  const options = useMemo(
    () => ({
      autoPlay: true,
      background: {
        color: {
          value: "transparent",
        },
        opacity: 1,
      },
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      fpsLimit: 120,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "",
            parallax: {
              enable: true,
              force: 60,
              smooth: 10,
            },
          },
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          repulse: {
            distance: 150,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: "ease-out-quad",
          },
          push: {
            quantity: 4,
            particles: {
              color: {
                value: ["rgba(207,8,140,1)", "#818cf8", "#6366f1"],
              },
              opacity: {
                value: { min: 0.3, max: 0.8 },
              },
            },
          },
        },
      },
      particles: {
        color: {
          value: ["rgba(207,8,140,0.5)", "#818cf8", "#6366f1"],
          animation: {
            enable: true,
            speed: 20,
            sync: false,
          },
        },
        links: {
          color: {
            value: ["rgba(207,8,140,0.2)", "rgba(99,102,241,0.2)"],
          },
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
          triangles: {
            enable: true,
            opacity: 0.05,
          },
        },
        move: {
          enable: true,
          speed: { min: 0.2, max: 0.8 },
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          attract: {
            enable: false,
            distance: 100,
            rotate: {
              x: 600,
              y: 1200,
            },
          },
        },
        number: {
          density: {
            enable: true,
            area: 800,
            factor: 1000,
          },
          limit: 0,
          value: 120, // Increased from 80
        },
        opacity: {
          random: {
            enable: true,
            minimumValue: 0.1,
          },
          value: {
            min: 0.1,
            max: 0.5,
          },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        shape: {
          type: ["circle", "triangle"],
          options: {
            triangle: {
              sides: 3,
            },
          },
        },
        size: {
          random: {
            enable: true,
            minimumValue: 1,
          },
          value: {
            min: 1,
            max: 3,
          },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        twinkle: {
          lines: {
            enable: true,
            frequency: 0.05,
            opacity: 0.5,
            color: {
              value: ["rgba(207,8,140,1)", "#818cf8"],
            },
          },
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );
  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex: 1,
        transform: "translate3d(0,0,0)",
        WebkitTransform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          willChange: "transform",
          perspective: 1000,
          WebkitPerspective: 1000,
        }}
      >
        {init && (
          <Particles
            id="tsparticles"
            className="absolute inset-0"
            particlesLoaded={particlesLoaded}
            options={options}
            style={{
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(ParticlesComponent, (prevProps, nextProps) => {
  return true;
});
