import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

import { useToast } from "../ui/use-toast";
import ControlSelect from "./ControlSelect";
import NewSectionForm from "./NewSectionForm";
import PinTypeSelect from "./PinTypeSelect";
import PinMapper from "./PinMapper";

interface Project {
  id: string;
  label: string;
}

export interface Pin {
  id: number;
  x: number;
  y: number;
  x2?: number;
  y2?: number;
  detailType: string;
  direction?: string;
  label?: string;
  pinData?: {
    url: string;
    project: string;
    projectID: string;
  };
}

type Props = {
  imageUrl: string;
  oldPins: any;
  detailsData: any;
  planeId: any;
  handleRefatch: any;
  overviewID: any;
};

function PlanViewer({
  imageUrl,
  oldPins,
  detailsData,
  planeId,
  handleRefatch,
  overviewID,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const { toast } = useToast();

  const [lockView, setLockView] = React.useState<boolean>(false);

  const [open, setOpen] = React.useState(false);

  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [tempPosition, setTempPosition] = React.useState<any>({ x: 0, y: 0 });

  const [fullScreen, setFullScreen] = React.useState(false);

  const [dragging, setDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  const [pinId, setPinId] = React.useState(10);
  const [pins, setPins] = React.useState<Pin[]>(oldPins);

  const [newDetail, setNewDetail] = React.useState(false);

  const [newSectionPins, setnewSectionPins] = React.useState<any[]>([]);
  const [tempPins, setTempPins] = React.useState<any>({});

  const [tempPin, setTempPin] = React.useState<any>({
    x: undefined,
    y: undefined,
  });

  const [pinType, setPinType] = React.useState<
    "detail" | "section" | "rectangle"
  >("section");

  const [imageDimensions, setImageDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const imgElement = event.currentTarget;
    setImageDimensions({
      width: imgElement.width,
      height: imgElement.height,
    });
  };

  const [zoom, setZoom] = React.useState(1);

  const handleToast = (content: string, type: string) => {
    toast({
      className: cn(
        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      variant: "destructive",
      title: content,
    });
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (open) return; // If disabled, do nothing

    const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
    let newZoom = zoom * zoomFactor;

    newZoom = Math.min(Math.max(newZoom, 0.3), 3);

    if (newZoom === zoom) {
      if (newZoom === 3) {
        handleToast("Maximum zoom in reached", "ALERT");
      } else if (newZoom === 0.3) {
        handleToast("Maximum zoom out reached", "ALERT");
      }
    } else {
      setZoom(newZoom);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      requestAnimationFrame(() => {
        const newPosition = {
          x: (event.clientX - dragStart.x * zoom) / zoom,
          y: (event.clientY - dragStart.y * zoom) / zoom,
        };
        setPosition(newPosition);
      });
    }
  };

  const handleMouseMoveContainer = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    // Calculate percentage values
    const x = (offsetX / rect.width) * 100;
    const y = (offsetY / rect.height) * 100;

    // Calculate pixel values
    const xPixels = offsetX;
    const yPixels = offsetY;

    const newPosition = {
      x,
      y,
    };

    setTempPosition(newPosition);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    // Check if it's a two-finger touch or a middle mouse button click
    const isTwoFingerTouch =
      event.type === "touchstart" &&
      (event as React.TouchEvent).touches.length === 2;

    const isMiddleButtonClicked =
      event.type === "mousedown" && (event as React.MouseEvent).button === 1;

    if (isTwoFingerTouch || isMiddleButtonClicked) {
      // Prevent default behavior to avoid issues on touch devices
      event.preventDefault();

      setDragging(true);

      // Get the average position of two touches or the single touch/mouse position
      const touchX = isTwoFingerTouch
        ? ((event as React.TouchEvent).touches[0].clientX +
            (event as React.TouchEvent).touches[1].clientX) /
          2
        : (event as React.MouseEvent).clientX;

      const touchY = isTwoFingerTouch
        ? ((event as React.TouchEvent).touches[0].clientY +
            (event as React.TouchEvent).touches[1].clientY) /
          2
        : (event as React.MouseEvent).clientY;

      // Adjust the drag start position based on the current zoom level
      const scaledPosition = {
        x: touchX / zoom - position.x,
        y: touchY / zoom - position.y,
      };

      setDragStart(scaledPosition);
    }
  };

  const zoomHandler = (e: any) => {
    setZoom(zoom + e);
  };

  // removing pin from pins array
  const handlePinClick = (clickedPinId: number) => {
    const updatedPins = pins.filter((pin) => pin.id !== clickedPinId);
    setPins(updatedPins);
  };

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!dragging) {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      // Calculate percentage values
      const x = (offsetX / rect.width) * 100;
      const y = (offsetY / rect.height) * 100;

      let detailType = pinType;

      if (detailType === "detail") {
        const newPin: Pin = { id: pinId, x, y, detailType };
        setTempPins({
          start: { x, y },
        });
        console.log("pinx", x, "piny", y);
        setOpen(true);
      } else if (detailType === "section") {
        console.log("prvi pin je udaren", x, y);

        setnewSectionPins((newSectionPins) => {
          const updatedPins = [...newSectionPins, { x, y }];
          return updatedPins;
        });
      } else if (detailType === "rectangle") {
        console.log("prvi pin je udaren rectangle", x, y);

        setnewSectionPins((newSectionPins) => {
          const updatedPins = [...newSectionPins, { x, y }];
          return updatedPins;
        });
      }
    }
  };

  React.useEffect(() => {
    if (newSectionPins.length === 2 && pinType === "section") {
      let x = newSectionPins[0].x;
      let y = newSectionPins[0].y;
      let x2 = newSectionPins[1].x;
      let y2 = newSectionPins[1].y;

      setTempPins({
        start: { x, y },
        end: { x2, y2 },
      });

      setOpen(true);
    }

    if (newSectionPins.length === 2 && pinType === "rectangle") {
      let x = newSectionPins[0].x;
      let y = newSectionPins[0].y;
      let x2 = newSectionPins[1].x;
      let y2 = newSectionPins[1].y;

      setTempPins({
        start: { x, y },
        end: { x2, y2 },
      });

      setOpen(true);
    }

    if (newSectionPins.length === 1) {
      let x = newSectionPins[0].x;
      let y = newSectionPins[0].y;

      setTempPin({
        x: x,
        y: y,
      });
    }
  }, [newSectionPins]);

  // reseting usestates to empty
  React.useEffect(() => {
    if (open === false) {
      setTempPin({});
      setTempPins({});
      setnewSectionPins([]);
    }
  }, [open]);

  // blocking overflow when fullscreen
  React.useEffect(() => {
    if (fullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [fullScreen]);

  React.useEffect(() => {
    console.log(pinType);
  }, [pinType]);

  const handleKeyPress = (event: KeyboardEvent) => {
    // Check if the pressed key is '1'
    if (event.key === "Escape") {
      console.log("Number 1 pressed");
      setTempPin({});
      setTempPins({});
      setnewSectionPins([]);
    }
    if (event.key === "1") {
      setPinType("section");
    }
    if (event.key === "2") {
      setPinType("rectangle");
    }
    if (event.key === "3") {
      setPinType("detail");
    }
  };

  React.useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={cn(
        "bg-white  w-[100%]  justify-center items-center flex relative overflow-hidden",
        `${
          fullScreen
            ? "h-[100vh] absolute inset top-0 right-0 left-0 bottom-0 overflow-hidden z-50"
            : "h-[90vh] "
        }`
      )}
      style={{
        cursor: dragging ? "grabbing" : "",
      }}
      ref={containerRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="absolute inset-0 flex items-center justify-center opacity-10 bg-zinc-200 overflow-hidden"
        style={{
          backgroundColor: "",
          backgroundImage:
            "radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "15px 15px",
        }}
      ></div>
      {/* this is just for zoom container  */}
      <ControlSelect
        zoomHandler={zoomHandler}
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
        lockView={lockView}
        setLockView={setLockView}
        setDragging={setDragging}
        dragging={dragging}
        pinType={pinType}
        setPinType={setPinType}
      />
      {/* dialog thing */}
      <NewSectionForm
        setNewDetail={setNewDetail}
        newDetail={newDetail}
        setOpen={setOpen}
        open={open}
        setPins={setPins}
        tempPins={tempPins}
        setPinId={setPinId}
        pinId={pinId}
        setTempPin={setTempPin}
        pins={pins}
        setTempPins={setTempPins}
        pinType={pinType}
        planeId={planeId}
        handleRefatch={handleRefatch}
        overviewID={overviewID}
      />
      {/* this is for adding or removing pins */}
      {/* <PinTypeSelect pinType={pinType} setPinType={setPinType} /> */}
      {/* image container */}
      <div
        className={cn(
          "bg-zinc-100 h-fit ",
          `{${zoom === 1 ? "h-full" : "h-fit"}}`
        )}
        style={{
          transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "center",
          transition: dragging ? " transform 0.02s ease-in-out" : "none",
        }}
      >
        <div
          onMouseMove={handleMouseMoveContainer}
          className="w-full h-full relative"
          style={{
            cursor: dragging ? "grabbing" : "crosshair",
          }}
        >
          <Image
            ref={imageRef}
            src={imageUrl}
            alt=""
            width={10000}
            height={10000}
            className={`w-full h-full object-contain -z-10`}
            onLoad={handleImageLoad}
            onClick={handleImageClick}
          />
          <PinMapper
            pins={pins}
            handlePinClick={handlePinClick}
            imageDimensions={imageDimensions}
            tempPin={tempPin}
            tempPosition={tempPosition}
            pinType={pinType}
            detailsData={detailsData}
            handleRefatch={handleRefatch}
            zoom={zoom}
          />
        </div>
      </div>
    </div>
  );
}

export default PlanViewer;
