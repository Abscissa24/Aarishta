"use client";

interface PhotoProps {
  imageSrc: string;
  imageAlt: string;
}

export default function Photo({ imageSrc, imageAlt }: PhotoProps) {
  return (
    <div className="relative h-full w-full">
      <div className="relative flex items-center justify-center">
        {/* Image */}
        <div className="absolute h-[298px] w-[298px] p-10 mix-blend-lighten xl:h-[498px] xl:w-[498px]">
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="eager"
            className="h-full w-full rounded-full object-contain"
          />
        </div>

        {/* Circle - see .avatar-ring-rotate/.avatar-ring-dash in
            global.css for the actual keyframe animations. Native CSS
            animations (rather than a Framer Motion one) are
            deliberate here: animation-play-state: paused gives a TRUE
            pause/resume (the browser tracks exact elapsed position
            within the loop), which a JS/Framer Motion keyframe-array
            animation cannot do - stopping and re-issuing the same
            `animate` target always restarts the sequence back toward
            its first frame instead of continuing from wherever it
            was.

            The rotation and the dash-pattern change are split across
            two elements (a wrapping <g> and the <circle> itself)
            rather than animated together on one element, so the
            compositor-only rotation never gets tied to the repaint
            cost of the dash change - see the comment in global.css
            for the full reasoning. */}
        <svg
          className="h-[300px] w-[300px] xl:h-[506px] xl:w-[506px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="avatar-ring-rotate">
            <circle
              className="avatar-ring-dash"
              cx="253"
              cy="253"
              r="250"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
