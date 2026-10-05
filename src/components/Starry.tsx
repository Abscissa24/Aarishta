import { useEffect, useMemo, useCallback, useRef } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  className?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleDensity?: number;
  opacity?: number;
};

const Starry = ({
  className,
  minSize,
  maxSize,
  speed,
  particleDensity,
  opacity,
}: ParticlesProps) => {
  const controls = useAnimation();
  // The live tsParticles container, once loaded. Kept in a ref (not
  // state) so pausing/resuming it never triggers a re-render or
  // changes the `options` prop identity below - that matters because a
  // changed `options` reference makes <Particles> reinitialize the
  // whole field with fresh random positions instead of freezing it in
  // place. Reduced motion is handled by calling container.pause()/
  // .play() directly instead.
  const containerRef = useRef<Container | undefined>(undefined);
  const reducedMotionRef = useRef(false);

  // Matches the duration of the initial load-in fade below, so toggling
  // reduced motion on feels like the exact reverse of that fade rather
  // than a different transition.
  const FADE_SECONDS = 1;

  useEffect(() => {
    const updateFromReduceMotionClass = () => {
      const root = document.documentElement;
      const reduced = root.classList.contains("reduce-motion");
      if (reduced === reducedMotionRef.current) return;
      reducedMotionRef.current = reduced;
      const container = containerRef.current;
      if (!container) return;
      if (reduced) {
        // Fade out first, then pause once fully invisible - the
        // reverse of the load-in fade, rather than just freezing the
        // field mid-motion. Only pause if reduced motion is still on
        // once the fade finishes (it may have been toggled back off
        // mid-fade).
        controls
          .start({
            opacity: 0,
            transition: { duration: FADE_SECONDS },
          })
          .then(() => {
            if (reducedMotionRef.current) container.pause();
          });
      } else {
        container.play();
        controls.start({
          opacity: opacity || 1,
          transition: { duration: FADE_SECONDS },
        });
      }
    };
    updateFromReduceMotionClass();

    const observer = new MutationObserver(updateFromReduceMotionClass);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (!container) return;
      containerRef.current = container;
      // Cover the case where reduced motion is already on before this
      // fires: stay paused and invisible instead of loading in, since
      // reduced motion means faded out (see updateFromReduceMotionClass
      // above).
      if (reducedMotionRef.current) {
        container.pause();
        return;
      }
      await controls.start({
        opacity: opacity || 1,
        transition: { duration: 1, delay: 2 },
      });
    },
    [controls, opacity],
  );

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          // `resize` takes an { enable, delay } object, not a boolean -
          // the previous `true as any` compiled, but silently discarded
          // the value (loadProperty read `data.enable` off of `true`,
          // which is undefined, so it just fell back to the built-in
          // default). Passing the real shape here removes the type
          // hack and makes the debounce delay explicit and tunable.
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        bounce: {
          horizontal: {
            value: 1,
          },
          vertical: {
            value: 1,
          },
        },
        collisions: {
          absorb: {
            speed: 2,
          },
          bounce: {
            horizontal: {
              value: 1,
            },
            vertical: {
              value: 1,
            },
          },
          enable: false,
          maxSpeed: 50,
          mode: "bounce",
          overlap: {
            enable: true,
            retries: 0,
          },
        },
        // tsParticles v4 moved particle fill color from `particles.color`
        // to `particles.paint.color` (see the v4 migration notes / engine
        // changelog: "changed particles.color to particles.paint.color").
        // The old `particles.color` path is silently ignored by v4 - no
        // warning, no error - so particles always fell back to the
        // engine's built-in default color (white) regardless of what was
        // configured here.
        //
        // The color is fixed at white rather than driven by the current
        // theme: light/dark is instead handled by inverting the canvas
        // with a CSS filter (see #tsparticles canvas in global.css).
        // Feeding the theme into these options would put `particleColor`
        // in this object's dependency array, which changes the `options`
        // reference on every theme toggle and makes <Particles> tear the
        // whole field down and regenerate it from scratch - visible as a
        // gap between the (instant) background color swap and the stars
        // reappearing. A CSS filter recolors already-rendered pixels
        // every frame instead, so it's instant and never reinitializes
        // anything.
        paint: {
          color: {
            value: "#FFF",
            animation: {
              h: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0,
              },
              s: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0,
              },
              l: {
                count: 0,
                enable: false,
                speed: 1,
                decay: 0,
                delay: 0,
                sync: true,
                offset: 0,
              },
            },
          },
          fill: {
            enable: true,
            opacity: 1,
          },
        },
        effect: {
          close: true,
          fill: true,
          options: {},
          type: {} as any,
        },
        groups: {},
        move: {
          angle: {
            offset: 0,
            value: 90,
          },
          attract: {
            distance: 200,
            enable: false,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
          center: {
            x: 50,
            y: 50,
            mode: "percent",
            radius: 0,
          },
          decay: 0,
          distance: {},
          direction: "none",
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 9.81,
            enable: false,
            inverse: false,
            maxSpeed: 50,
          },
          path: {
            clamp: true,
            delay: {
              value: 0,
            },
            enable: false,
            options: {},
          },
          outModes: {
            default: "out",
          },
          random: false,
          size: false,
          speed: {
            min: 0.1,
            max: 1,
          },
          spin: {
            acceleration: 0,
            enable: false,
          },
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fill: {},
          },
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: true,
            width: 400,
            height: 400,
          },
          limit: {
            mode: "delete",
            value: 0,
          },
          value: particleDensity || 120,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 1,
          },
          animation: {
            count: 0,
            enable: true,
            speed: speed || 4,
            decay: 0,
            delay: 0,
            sync: false,
            mode: "auto",
            startValue: "random",
            destroy: "none",
          },
        },
        reduceDuplicates: false,
        shadow: {
          blur: 0,
          color: {
            value: "#000",
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        shape: {
          close: true,
          fill: true,
          options: {},
          type: "circle",
        },
        size: {
          value: {
            min: minSize || 1,
            max: maxSize || 3,
          },
          animation: {
            count: 0,
            enable: false,
            speed: 5,
            decay: 0,
            delay: 0,
            sync: false,
            mode: "auto",
            startValue: "random",
            destroy: "none",
          },
        },
        stroke: {
          width: 0,
        },
        zIndex: {
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
        destroy: {
          bounds: {},
          mode: "none",
          split: {
            count: 1,
            factor: {
              value: 3,
            },
            rate: {
              value: {
                min: 4,
                max: 9,
              },
            },
            sizeOffset: true,
          },
        },
        roll: {
          darken: {
            enable: false,
            value: 0,
          },
          enable: false,
          enlighten: {
            enable: false,
            value: 0,
          },
          mode: "vertical",
          speed: 25,
        },
        tilt: {
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          enable: false,
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
          particles: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
        },
        wobble: {
          distance: 5,
          enable: false,
          speed: {
            angle: 50,
            move: 10,
          },
        },
        life: {
          count: 0,
          delay: {
            value: 0,
            sync: false,
          },
          duration: {
            value: 0,
            sync: false,
          },
        },
        rotate: {
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          path: false,
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            delay: 0,
            sync: false,
          },
          enable: false,
          opacity: 1,
          rotation: {
            value: 45,
          },
          width: 1,
        },
        links: {
          blink: false,
          color: {
            value: "#FFF",
          },
          consent: false,
          distance: 100,
          enable: false,
          frequency: 1,
          opacity: 1,
          shadow: {
            blur: 5,
            color: {
              value: "#000",
            },
            enable: false,
          },
          triangles: {
            enable: false,
            frequency: 1,
          },
          width: 1,
          warp: false,
        },
        repulse: {
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1,
        },
      },
      detectRetina: true,
    }),
    [minSize, maxSize, speed, particleDensity, opacity],
  );

  return (
    <ParticlesProvider init={loadSlim}>
      <motion.div animate={controls} className={cn("opacity-0", className)}>
        <Particles
          // No `key` tied to theme here anymore: color is now handled
          // by a CSS filter (see the `paint.color` comment above)
          // instead of an `options` field, and none of this component's
          // other options ever change after mount (the props passed to
          // <Starry> in BaseLayout.astro are static literals), so
          // `options` keeps a stable reference for the component's
          // whole lifetime. That means @tsparticles/react's own
          // reinit-on-options-change effect never has a reason to fire
          // again after the first load, so there's no repeated-reload
          // path left for it to fail silently on.
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </motion.div>
    </ParticlesProvider>
  );
};

export default Starry;
