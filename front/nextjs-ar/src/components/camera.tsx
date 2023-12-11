"use client"
import React,{useState,useRef, useEffect} from "react"
import { Camera,CameraType } from "react-camera-pro"

export default function CameraComponent(){
    const camera = useRef<CameraType>(null)
    const [image,setImage] = useState<string | null>(null)
    const [devices,setDevices] = useState<MediaDeviceInfo[]>([])
    const [numberOfCameras,setNumberOfCameras] = useState<number>(0)
    const [activeDeviceId,setActiveDeviceId] = useState<string | undefined>(undefined)
    useEffect(() => {
        (async () => {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const videoDevices = devices.filter((i) => {i.kind  === "videoinput"})
            setDevices(videoDevices)
            console.log(devices)
        })()
    
    })
    
    return (
        <>
            <Camera 
                ref={camera}
                facingMode="environment"
                aspectRatio={16/9}
                numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
                videoSourceDeviceId={activeDeviceId}
                errorMessages={{
                noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                switchCamera:'It is not possible to switch camera to different one because there is only one video device accessible.',
                canvas: 'Canvas is not supported.',
            }} />
            <button className="btn btn-outline" onClick={() => {
                    if(camera.current !== null){
                        setImage(camera.current.takePhoto())
                    }
                }}>Take Photo</button>
            <select className="select select-bordered w-full select-sm" onChange={(event) => {setActiveDeviceId(event.target.value)}}>
                {devices.map((id) => {
                    return (
                    <option key={id.deviceId} value={id.deviceId}>
                        {id.label}
                    </option>)
                })}
            </select>
            <img src={image as string} alt="Taken Photo" />
        </>
    ) 
} 