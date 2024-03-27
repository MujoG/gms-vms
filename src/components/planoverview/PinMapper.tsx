import React from "react";
import DetailBox from "./DetailBox";
import { Dice1, Disc, MoveRight } from "lucide-react";
import RightClickDetail from "./RightClickDetail";

type Props = {
  pins: any;
  handlePinClick: any;
  imageDimensions: any;
  tempPin: any;
  tempPosition?: any;
  pinType: any;
  detailsData: any;
  handleRefatch: any;
  zoom: any;
};

function PinMapper({
  pins,
  handlePinClick,
  imageDimensions,
  tempPin,
  tempPosition,
  pinType,
  detailsData,
  handleRefatch,
  zoom,
}: Props) {
  console.log("mujooooo", detailsData);

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

      {detailsData && detailsData.length > 0 ? (
        <>
          {detailsData.map((pin: any, index: any) => {
            if (pin.pinType === "detail") {
              return (
                <div
                  key={index}
                  className="absolute z-50 top-[55%] -left-[65%] flex items-center justify-center"
                  style={{
                    top: `${pin.y1coordinate}%`,
                    left: `${pin.x1coordinate}%`,
                    transform: `translate(-50%, -50%) `,
                  }}
                >
                  <RightClickDetail
                    pinType="task"
                    pinData={pin}
                    handleRefatch={handleRefatch}
                  />
                </div>
              );
            } else if (
              pin.pinType === "section" &&
              pin.x2coordinate !== undefined &&
              pin.y2coordinate !== undefined
            ) {
              const containerWidth = imageDimensions.width;
              const containerHeight = imageDimensions.height;

              const endX = (pin.x2coordinate / 100) * containerWidth;
              const endY = (pin.y2coordinate / 100) * containerHeight;

              const startX = (pin.x1coordinate / 100) * containerWidth;
              const startY = (pin.y1coordinate / 100) * containerHeight;

              const lineAngle = Math.atan2(endY - startY, endX - startX);

              let perpendicularAngle;

              if (pin.direction === "right") {
                perpendicularAngle = lineAngle + Math.PI / 2;
              } else if (pin.direction === "left") {
                perpendicularAngle = lineAngle - Math.PI / 2;
              } else {
                perpendicularAngle = lineAngle - Math.PI / 2;
              }

              const baseIconSize = 25;
              const baseStrokeSize = 3;

              // Calculate the scaled size based on the zoom level
              const scaledSize = baseIconSize / zoom;
              const baseFontSize = 24;
              // Cap the scaled size to ensure it remains within a reasonable range
              const cappedScaledSize = Math.min(Math.max(scaledSize, 15), 35);

              const fontScaledSize = Math.min(
                Math.max(baseFontSize / zoom, 7),
                9
              );
              const strokeWidthScaled = Math.min(
                Math.max(baseStrokeSize / zoom, 1),
                3
              );

              return (
                <>
                  <div
                    className="absolute z-50 top-[55%] -left-[65%] flex items-center justify-center"
                    style={{
                      top: `${pin.y1coordinate}%`,
                      left: `${pin.x1coordinate}%`,
                      transform: `translate(-50%, -50%) `,
                    }}
                  >
                    {/* <DetailBox
                      handlePinClick={handlePinClick}
                      pin={pin}
                      handleRefatch={handleRefatch}
                      zoom={zoom}
                    /> */}
                    <RightClickDetail
                      pinType="section"
                      pinData={pin}
                      handleRefatch={handleRefatch}
                    />
                  </div>
                  {/* arrow icon and location  */}
                  <div
                    className="absolute h-[20px] w-[20px] flex items-center justify-center cursor-pointer"
                    style={{
                      top: `${pin.y1coordinate}%`,
                      left: `${pin.x1coordinate}%`,
                      transform: `translate(-50%, -50%) rotate(${perpendicularAngle}rad)`,
                    }}
                  >
                    <div className="absolute w-full h-full -top-[55%] -left-[65%] flex items-center justify-center">
                      <div
                        className={`${
                          pin.direction === "right" ? "rotate-180" : ""
                        } text-red-500 text-xs uppercase font-semibold`}
                        style={{
                          fontSize: fontScaledSize,
                        }}
                      >
                        {pin.DetailLabel}
                      </div>
                    </div>
                    <div className="absolute w-full h-full top-[5%] -left-[65%] flex items-center justify-center">
                      <MoveRight
                        className="text-red-500 "
                        style={{
                          width: cappedScaledSize,
                          height: cappedScaledSize,
                        }}
                      />
                      {/* {zoom} */}
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
                      x1={`${pin.x1coordinate}%`}
                      y1={`${pin.y1coordinate}%`}
                      x2={
                        pin.x2coordinate !== undefined
                          ? `${pin.x2coordinate}%`
                          : "0%"
                      }
                      y2={
                        pin.y2coordinate !== undefined
                          ? `${pin.y2coordinate}%`
                          : "0%"
                      }
                      stroke="red"
                      strokeWidth={`${strokeWidthScaled}`}
                    />
                  </svg>
                  <div
                    className="absolute z-50 top-[55%] -left-[65%] flex items-center justify-center"
                    style={{
                      top: `${pin.y2coordinate}%`,
                      left: `${pin.x2coordinate}%`,
                      transform: `translate(-50%, -50%) `,
                    }}
                  >
                    {/* <DetailBox
                      handlePinClick={handlePinClick}
                      pin={pin}
                      handleRefatch={handleRefatch}
                      zoom={zoom}
                    /> */}
                    <RightClickDetail
                      pinType="section"
                      pinData={pin}
                      handleRefatch={handleRefatch}
                    />
                  </div>
                  <div
                    className="absolute h-[20px] w-[20px] flex items-center justify-center"
                    style={{
                      top: `${pin.y2coordinate}%`,
                      left: `${pin.x2coordinate}%`,
                      transform: `translate(-50%, -50%) rotate(${perpendicularAngle}rad)`,
                    }}
                  >
                    <div className="absolute w-full h-full top-[55%] -left-[65%] flex items-center justify-center">
                      <div
                        className={`${
                          pin.direction === "right" ? "rotate-180" : ""
                        } text-red-500 text-xs uppercase font-semibold`}
                        style={{
                          fontSize: fontScaledSize,
                        }}
                      >
                        {pin.DetailLabel}
                      </div>
                    </div>
                    <div className="absolute w-full h-full -top-[5%] -left-[65%] flex items-center justify-center">
                      <MoveRight
                        className="text-red-500 w-[25px] h-[25px]"
                        style={{
                          width: cappedScaledSize,
                          height: cappedScaledSize,
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            } else if (
              pin.DetailType === "rectangle" &&
              pin.x2coordinate !== undefined &&
              pin.y2coordinate !== undefined
            ) {
              const containerWidth = imageDimensions.width;
              const containerHeight = imageDimensions.height;

              const startX = (pin.X / 100) * containerWidth;
              const startY = (pin.Y / 100) * containerHeight;

              const endX = (pin.X2 / 100) * containerWidth;
              const endY = (pin.Y2 / 100) * containerHeight;

              const baseIconSize = 25;
              const baseStrokeSize = 3;

              // Calculate the scaled size based on the zoom level
              const scaledSize = baseIconSize / zoom;

              // Cap the scaled size to ensure it remains within a reasonable range
              const cappedScaledSize = Math.min(Math.max(scaledSize, 15), 35);
              const fontScaledSize = Math.min(Math.max(scaledSize, 7), 12);
              const strokeWidthScaled = Math.min(
                Math.max(baseStrokeSize / zoom, 1),
                3
              );

              return (
                <>
                  <div
                    className="absolute z-50 w-[20px] h-[20px] flex items-center justify-center "
                    style={{
                      top: `${pin.y1coordinate}%`,
                      left: `${pin.x1coordinate}%`,
                      transform: `translate(-50%, -50%) `,
                    }}
                  >
                    <div className="absolute w-full h-full top-[120%] left-[120%] flex items-center justify-center">
                      {/* <DetailBox
                        handlePinClick={handlePinClick}
                        pin={pin}
                        label={pin.DetailLabel}
                        handleRefatch={handleRefatch}
                        zoom={zoom}
                      /> */}
                      <RightClickDetail
                        pinType="rectangle"
                        pinData={pin}
                        handleRefatch={handleRefatch}
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
                      x={`${Math.min(pin.x1coordinate, pin.x2coordinate)}%`}
                      y={`${Math.min(pin.y1coordinate, pin.y2coordinate)}%`}
                      width={`${Math.abs(
                        pin.x1coordinate - pin.x2coordinate
                      )}%`}
                      height={`${Math.abs(
                        pin.y1coordinate - pin.y2coordinate
                      )}%`}
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
