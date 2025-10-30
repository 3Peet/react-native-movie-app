import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
	id,
	poster_path,
	title,
	vote_average,
	release_date,
	original_language,
}: Movie) => {
	return (
		<Link href={`/movies/${id}`} asChild>
			<TouchableOpacity className="w-[30%]">
				<Image
					source={{
						uri: poster_path
							? `https://image.tmdb.org/t/p/w500${poster_path}`
							: "https://placehold.co/500x700/1a1a1a/ffffff.png?text=Poster",
					}}
					className="h-52 w-full rounded-lg"
					resizeMode="cover"
				/>
				<Text className="mt-2 font-bold text-sm text-white" numberOfLines={1}>
					{title}
				</Text>
				<View className="flex-row items-center justify-start gap-x-1">
					<Image source={icons.star} className="size-4" />
					<Text className="font-bold text-white text-xs">
						{Math.round(vote_average / 2)}
					</Text>
				</View>
				<View className="flex-row items-center justify-between">
					<Text className="mt-1 font-medium text-light-300 text-xs">
						{release_date?.split("-")[0]}
					</Text>
					<Text className="font-medium text-light-300 text-xs uppercase">
						{original_language}
					</Text>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default MovieCard;
