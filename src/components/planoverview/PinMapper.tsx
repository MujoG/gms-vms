import React from "react";
import DetailBox from "./DetailBox";
import { Disc, MoveRight } from "lucide-react";

type Props = {
  pins: any;
  handlePinClick: any;
  imageDimensions: any;
  tempPin: any;
  tempPosition?: any;
  pinType: any;
  detailsData: any;
};

function PinMapper({
  pins,
  handlePinClick,
  imageDimensions,
  tempPin,
  tempPosition,
  pinType,
  detailsData,
}: Props) {
  return (
    <div>
      {tempPin.x !== undefined &&
      tempPin.y !== undefined &&
      pinType === "rectangle" ? (
        <svg
          key={tempPin.x}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
          className="w-full h-full "
        >
          {/* Rectangle itself */}
          <rect
            x={`${Math.min(tempPin.x, tempPosition.x)}%`}
            y={`${Math.min(tempPin.y, tempPosition.y)}%`}
            width={`${Math.abs(tempPin.x - tempPosition.x)}%`}
            height={`${Math.abs(tempPin.y - tempPosition.y)}%`}
            stroke="green"
            strokeWidth="3"
            fill="transparent"
          />
        </svg>
      ) : null}
      {tempPin.x !== undefined &&
      tempPin.y !== undefined &&
      pinType === "section" ? (
        <svg
          key={tempPin.x}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
          className="w-full h-full "
        >
          {/* Line itself */}
          <line
            x1={`${tempPin.x}%`}
            y1={`${tempPin.y}%`}
            x2={tempPosition.x !== undefined ? `${tempPosition.x}%` : "0%"}
            y2={tempPosition.y !== undefined ? `${tempPosition.y}%` : "0%"}
            stroke="blue"
            strokeWidth="3"
          />
        </svg>
      ) : null}
      {pins && pins.length > 0 && (
        <>
          {pins.map((pin: any) => {
            if (pin.DetailType === "detail") {
              return (
                <>
                  <div
                    key={pin.id}
                    className="absolute w-[24px] h-[24px] z-40 top-[50%]"
                    style={{
                      top: `${pin.X}%`,
                      left: `${pin.Y}%`,
                    }}
                    onClick={() => console.log("mujo", pin.x, pin.y)}
                  >
                    <div className="flex justify-center items-center relative w-full h-full">
                      <div className="mt-5">{pin.label}</div>
                      <span className="absolute -top-[50%] -left-[50%] cursor-pointer">
                        <DetailBox
                          handlePinClick={handlePinClick}
                          pin={pin}
                          showIcon
                        />
                      </span>
                    </div>
                  </div>
                </>
              );
            } else if (
              pin.DetailType === "section" &&
              pin.X2 !== undefined &&
              pin.Y2 !== undefined
            ) {
              const containerWidth = imageDimensions.width;
              const containerHeight = imageDimensions.height;

              const endX = (pin.X2 / 100) * containerWidth;
              const endY = (pin.Y2 / 100) * containerHeight;

              const startX = (pin.X / 100) * containerWidth;
              const startY = (pin.Y / 100) * containerHeight;

              const lineAngle = Math.atan2(endY - startY, endX - startX);

              let perpendicularAngle;

              if (pin.direction === "right") {
                perpendicularAngle = lineAngle + Math.PI / 2;
              } else if (pin.direction === "left") {
                perpendicularAngle = lineAngle - Math.PI / 2;
              } else {
                perpendicularAngle = lineAngle - Math.PI / 2;
              }

              console.log(pin, "pinmujo");

              return (
                <>
                  <div
                    className="absolute z-50 top-[55%] -left-[65%] flex items-center justify-center"
                    style={{
                      top: `${pin.Y}%`,
                      left: `${pin.X}%`,
                      transform: `translate(-50%, -50%) `,
                    }}
                  >
                    <DetailBox handlePinClick={handlePinClick} pin={pin} />
                  </div>
                  {/* arrow icon and location  */}
                  <div
                    className="absolute h-[20px] w-[20px] flex items-center justify-center cursor-pointer"
                    style={{
                      top: `${pin.Y}%`,
                      left: `${pin.X}%`,
                      transform: `translate(-50%, -50%) rotate(${perpendicularAngle}rad)`,
                    }}
                  >
                    <div className="absolute w-full h-full -top-[75%] -left-[65%] flex items-center justify-center">
                      <div
                        className={`${
                          pin.direction === "right" ? "rotate-180" : ""
                        } text-red-500 text-lg uppercase font-bold`}
                      >
                        {pin.DetailLabel}
                      </div>
                    </div>
                    <div className="absolute w-full h-full top-[5%] -left-[65%] flex items-center justify-center">
                      <MoveRight className="text-red-500 text-2xl" />
                    </div>
                  </div>

                  <svg
                    key={pin.id}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                    }}
                    className="w-full h-full "
                  >
                    {/* Line itself */}
                    <line
                      x1={`${pin.X}%`}
                      y1={`${pin.Y}%`}
                      x2={pin.X2 !== undefined ? `${pin.X2}%` : "0%"}
                      y2={pin.Y2 !== undefined ? `${pin.Y2}%` : "0%"}
                      stroke="red"
                      strokeWidth="3"
                    />
                  </svg>
                  <div
                    className="absolute z-50 top-[55%] -left-[65%] flex items-center justify-center"
                    style={{
                      top: `${pin.Y2}%`,
                      left: `${pin.X2}%`,
                      transform: `translate(-50%, -50%) `,
                    }}
                  >
                    <DetailBox handlePinClick={handlePinClick} pin={pin} />
                  </div>
                  <div
                    className="absolute h-[20px] w-[20px] flex items-center justify-center"
                    style={{
                      top: `${pin.Y2}%`,
                      left: `${pin.X2}%`,
                      transform: `translate(-50%, -50%) rotate(${perpendicularAngle}rad)`,
                    }}
                  >
                    <div className="absolute w-full h-full top-[55%] -left-[65%] flex items-center justify-center">
                      <div
                        className={`${
                          pin.direction === "right" ? "rotate-180" : ""
                        } text-red-500 text-lg uppercase font-bold`}
                      >
                        {pin.DetailLabel}
                      </div>
                    </div>
                    <div className="absolute w-full h-full -top-[5%] -left-[65%] flex items-center justify-center">
                      <MoveRight className="text-red-500 text-2xl" />
                    </div>
                  </div>
                </>
              );
            } else if (
              pin.DetailType === "rectangle" &&
              pin.X2 !== undefined &&
              pin.Y2 !== undefined
            ) {
              const containerWidth = imageDimensions.width;
              const containerHeight = imageDimensions.height;

              const startX = (pin.X / 100) * containerWidth;
              const startY = (pin.Y / 100) * containerHeight;

              const endX = (pin.X2 / 100) * containerWidth;
              const endY = (pin.Y2 / 100) * containerHeight;

              return (
                <>
                  <div
                    className="absolute z-50 w-[20px] h-[20px] flex items-center justify-center "
                    style={{
                      top: `${pin.Y}%`,
                      left: `${pin.X}%`,
                      transform: `translate(-50%, -50%) `,
                    }}
                  >
                    <div className="absolute w-full h-full top-[120%] left-[120%] flex items-center justify-center">
                      <DetailBox
                        handlePinClick={handlePinClick}
                        pin={pin}
                        label={pin.DetailLabel}
                      />
                    </div>
                  </div>
                  <svg
                    key={pin.id}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                    }}
                    className="w-full h-full"
                  >
                    {/* Rectangle itself */}
                    <rect
                      x={`${Math.min(pin.X, pin.X2)}%`}
                      y={`${Math.min(pin.Y, pin.Y2)}%`}
                      width={`${Math.abs(pin.X - pin.X2)}%`}
                      height={`${Math.abs(pin.Y - pin.Y2)}%`}
                      stroke="green"
                      strokeWidth="3"
                      fill="transparent"
                    />
                  </svg>
                </>
              );
            }
          })}
        </>
      )}

      {detailsData && detailsData.length > 0 ? (
        <>
          {detailsData.map((pin: any) => {
            if (pin.DetailType === "detail") {
              return (
                <>
                  <div
                    key={pin.id}
                    className="absolute w-[24px] h-[24px] z-40 top-[50%]"
                    style={{
                      top: `${pin.X}%`,
                      left: `${pin.Y}%`,
                    }}
                    onClick={() => console.log("mujo", pin.x, pin.y)}
                  >
                    <div className="flex justify-center items-center relative w-full h-full">
                      <div className="mt-5">{pin.label}</div>
                      <span className="absolute -top-[50%] -left-[50%] cursor-pointer">
                        <DetailBox
                          handlePinClick={handlePinClick}
                          pin={pin}
                          showIcon
                        />
                      </span>
                    </div>
                  </div>
                </>
              );
            } else if (
              pin.DetailType === "section" &&
              pin.X2 !== undefined &&
              pin.Y2 !== undefined
            ) {
              const containerWidth = imageDimensions.width;
              const containerHeight = imageDimensions.height;

              const endX = (pin.X2 / 100) * containerWidth;
              const endY = (pin.Y2 / 100) * containerHeight;

              const startX = (pin.X / 100) * containerWidth;
              const startY = (pin.Y / 100) * containerHeight;

              const lineAngle = Math.atan2(endY - startY, endX - startX);

              let perpendicularAngle;

              if (pin.direction === "right") {
                perpendicularAngle = lineAngle + Math.PI / 2;
              } else if (pin.direction === "left") {
                perpendicularAngle = lineAngle - Math.PI / 2;
              } else {
                perpendicularAngle = lineAngle - Math.PI / 2;
              }

              console.log(pin, "pinmujo");

              return (
                <>
                  <div
                    className="absolute z-50 top-[55%] -left-[65%] flex items-center justify-center"
                    style={{
                      top: `${pin.Y}%`,
                      left: `${pin.X}%`,
                      transform: `translate(-50%, -50%) `,
                    }}
                  >
                    <DetailBox handlePinClick={handlePinClick} pin={pin} />
                  </div>
                  {/* arrow icon and location  */}
                  <div
                    className="absolute h-[20px] w-[20px] flex items-center justify-center cursor-pointer"
                    style={{
                      top: `${pin.Y}%`,
                      left: `${pin.X}%`,
                      transform: `translate(-50%, -50%) rotate(${perpendicularAngle}rad)`,
                    }}
                  >
                    <div className="absolute w-full h-full -top-[75%] -left-[65%] flex items-center justify-center">
                      <div
                        className={`${
                          pin.direction === "right" ? "rotate-180" : ""
                        } text-red-500 text-lg uppercase font-bold`}
                      >
                        {pin.DetailLabel}
                      </div>
                    </div>
                    <div className="absolute w-full h-full top-[5%] -left-[65%] flex items-center justify-center">
                      <MoveRight className="text-red-500 text-2xl" />
                    </div>
                  </div>

                  <svg
                    key={pin.id}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                    }}
                    className="w-full h-full "
                  >
                    {/* Line itself */}
                    <line
                      x1={`${pin.X}%`}
                      y1={`${pin.Y}%`}
                      x2={pin.X2 !== undefined ? `${pin.X2}%` : "0%"}
                      y2={pin.Y2 !== undefined ? `${pin.Y2}%` : "0%"}
                      stroke="red"
                      strokeWidth="3"
                    />
                  </svg>
                  <div
                    className="absolute z-50 top-[55%] -left-[65%] flex items-center justify-center"
                    style={{
                      top: `${pin.Y2}%`,
                      left: `${pin.X2}%`,
                      transform: `translate(-50%, -50%) `,
                    }}
                  >
                    <DetailBox handlePinClick={handlePinClick} pin={pin} />
                  </div>
                  <div
                    className="absolute h-[20px] w-[20px] flex items-center justify-center"
                    style={{
                      top: `${pin.Y2}%`,
                      left: `${pin.X2}%`,
                      transform: `translate(-50%, -50%) rotate(${perpendicularAngle}rad)`,
                    }}
                  >
                    <div className="absolute w-full h-full top-[55%] -left-[65%] flex items-center justify-center">
                      <div
                        className={`${
                          pin.direction === "right" ? "rotate-180" : ""
                        } text-red-500 text-lg uppercase font-bold`}
                      >
                        {pin.DetailLabel}
                      </div>
                    </div>
                    <div className="absolute w-full h-full -top-[5%] -left-[65%] flex items-center justify-center">
                      <MoveRight className="text-red-500 text-2xl" />
                    </div>
                  </div>
                </>
              );
            } else if (
              pin.DetailType === "rectangle" &&
              pin.X2 !== undefined &&
              pin.Y2 !== undefined
            ) {
              const containerWidth = imageDimensions.width;
              const containerHeight = imageDimensions.height;

              const startX = (pin.X / 100) * containerWidth;
              const startY = (pin.Y / 100) * containerHeight;

              const endX = (pin.X2 / 100) * containerWidth;
              const endY = (pin.Y2 / 100) * containerHeight;

              return (
                <>
                  <div
                    className="absolute z-50 w-[20px] h-[20px] flex items-center justify-center "
                    style={{
                      top: `${pin.Y}%`,
                      left: `${pin.X}%`,
                      transform: `translate(-50%, -50%) `,
                    }}
                  >
                    <div className="absolute w-full h-full top-[120%] left-[120%] flex items-center justify-center">
                      <DetailBox
                        handlePinClick={handlePinClick}
                        pin={pin}
                        label={pin.DetailLabel}
                      />
                    </div>
                  </div>
                  <svg
                    key={pin.id}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                    }}
                    className="w-full h-full"
                  >
                    {/* Rectangle itself */}
                    <rect
                      x={`${Math.min(pin.X, pin.X2)}%`}
                      y={`${Math.min(pin.Y, pin.Y2)}%`}
                      width={`${Math.abs(pin.X - pin.X2)}%`}
                      height={`${Math.abs(pin.Y - pin.Y2)}%`}
                      stroke="green"
                      strokeWidth="3"
                      fill="transparent"
                    />
                  </svg>
                </>
              );
            }
          })}
        </>
      ) : null}
    </div>
  );
}

export default PinMapper;
