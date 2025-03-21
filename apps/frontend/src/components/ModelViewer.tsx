import { Canvas } from '@react-three/fiber';
import { Bounds, OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { DirectionalLight, Mesh } from 'three';

const ModelViewer = () => {
    const modelUrl = 'models/hook.glb';
    const modelName = 'hook';
    const lightRef = useRef<DirectionalLight>(null);
    const gltf = useGLTF(modelUrl);
    const mesh = gltf.nodes[modelName] as Mesh;

    return (
        <div className='container mx-auto h-280'>
            <Canvas camera={{ position: [-40, 50, 50] }} style={{ background: 'black' }}>
                <ambientLight intensity={0.5} />
                <directionalLight ref={lightRef} position={[1, 1, 0]} />
                <OrbitControls
                    makeDefault
                    onChange={(e) => {
                        if (!e) return;
                        const camera = e.target.object;

                        if (lightRef.current) {
                            lightRef.current.position.set(0, 1, 0);
                            lightRef.current.position.add(camera.position);
                        }
                    }}
                />
                <Bounds fit observe margin={1.2}>
                    <mesh castShadow receiveShadow geometry={mesh.geometry}>
                        <meshStandardMaterial color='hotpink' roughness={0.3} metalness={0.2} />
                    </mesh>
                </Bounds>
            </Canvas>
        </div>
    );
};

export default ModelViewer;
