import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({
	movie,
	index,
}: {
	movie: TrendingMovie;
	index: number;
}) => {
	return (
		<Link href={`/movies/${movie.movie_id}`} asChild>
			<TouchableOpacity className="relative w-32 pl-5">
				<Image
					source={{ uri: movie.poster_url }}
					className="h-48 w-32 rounded-lg"
					resizeMode="cover"
				/>
				<View className="-left-2 absolute bottom-9 rounded-full px-2 py-1">
					<MaskedView
						maskElement={
							<Text className="font-bold text-6xl text-white">{index + 1}</Text>
						}
					>
						<Image
							source={images.rankingGradient}
							className="size-14"
							resizeMode="cover"
						/>
					</MaskedView>
				</View>
				<Text
					className="mt-2 font-bold text-light-200 text-sm"
					numberOfLines={2}
				>
					{movie.title}
				</Text>
			</TouchableOpacity>
		</Link>
	);
};

export default TrendingCard;
