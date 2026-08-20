import { Ride } from '@/types/type';
import { Image, Text, View } from 'react-native';

const geoapifyKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY!

export default function RideCard({ ride }: { ride: Ride; }) {

    console.log(ride.destination_latitude);
    console.log(geoapifyKey);


    return (
        <View className='flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3 '>
            <View className='flex flex-col items-start justify-center p-3 '>
                <View className='flex flex-row items-center justify-between'>
                    <Image
                        source={{
                            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apikey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY!}`
                        }}
                        className='w-[80px] h-[90px] rounded-lg'
                    />

                </View>

            </View>
            <Text>RideCard</Text>
        </View>
    )
}