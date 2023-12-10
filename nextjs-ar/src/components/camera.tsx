"use client"
import Image from "next/image"
import React,{useState,useRef, useEffect} from "react"
import { Camera,CameraType,CameraProps } from "react-camera-pro"

export default function CameraComponent(){
    const camera = useRef<CameraType | null>(null)
    const [image,setImage] = useState<string | null>(null)
    const [devices,setDevices] = useState<MediaDeviceInfo[]>([])
    const [numberOfCameras,setNumberOfCameras] = useState<number>(0)
    const [activeDeviceId,setActiveDeviceId] = useState<string | undefined>(undefined)
    useEffect(() => {
        (async () => {
            const devices = await navigator.mediaDevices.enumerateDevices()
            const videoDevices = devices.filter((i) => {i.kind == "videoinput"})
            setDevices(videoDevices)
            console.log(devices)
        })()
    })
    
    return (
        <>
            <Camera 
                ref={camera}
                facingMode="user"
                aspectRatio={16/9}
                numberOfCamerasCallback={setNumberOfCameras}
                errorMessages={{
                noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                switchCamera:'It is not possible to switch camera to different one because there is only one video device accessible.',
                canvas: 'Canvas is not supported.',
            }} />
            <button onClick={() => {
                    if(typeof (camera.current) !== null){
                        setImage(camera.current!.takePhoto())
                    }
                }}>Take Photo</button>
            <select>
                {devices.map((id) => {
                    return (<option key={id.deviceId} value={id.deviceId}>
                        {id.label}
                    </option>)
                })}
            </select>
            <img src={image as string} alt="Taken Photo" />
        </>
    ) 
} 