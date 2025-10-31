import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/use-fetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MovieInfo = ({
	label,
	value,
}: {
	label: string;
	value?: string | number | null;
}) => {
	return (
		<View className="mt-5 flex-col items-start justify-center">
			<Text className="font-normal text-light-200 text-sm">{label}</Text>
			<Text className="mt-2 font-bold text-light-100 text-sm">
				{value || "N/A"}
			</Text>
		</View>
	);
};

export default function Movies() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const { data: movie } = useFetch(() => fetchMovieDetails(id as string));
	return (
		<View className="flex-1 bg-primary">
			<ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
				<View>
					<Image
						source={{
							uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
						}}
						className="h-[550px] w-full"
						resizeMode="stretch"
					/>
				</View>
				<View className="mt-5 flex-col items-start justify-center px-5">
					<Text className="font-bold text-white text-xl">{movie?.title}</Text>
					<View className="mt-2 flex-row items-center gap-x-1">
						<Text className="text-light-200 text-sm">
							{movie?.release_date.split("-")[0]}
						</Text>
						<Text className="text-light-200">{movie?.runtime}m</Text>
					</View>
					<View className="mt-2 flex-row items-center gap-x-1 rounded-md bg-dark-100 px-2 py-1">
						<Image className="size-4" source={icons.star} />
						<Text className="font-bold text-sm text-white">
							{Math.round(movie?.vote_average ?? 0)}/10
						</Text>
						<Text className="text-light-200 text-sm">
							({movie?.vote_count} votes)
						</Text>
					</View>
					<MovieInfo label="Overview" value={movie?.overview} />
					<MovieInfo
						label="Genres"
						value={movie?.genres.map((g) => g.name).join(" - ")}
					/>
					<View className="flex w-1/2 flex-row justify-between">
						<MovieInfo
							label="Budget"
							value={`$${((movie?.budget ?? 0) / 1_000_000).toLocaleString()} million`}
						/>
						<MovieInfo
							label="Revenue"
							value={`$${(Math.round(movie?.revenue ?? 0) / 1_000_000).toLocaleString()} million`}
						/>
					</View>
					<MovieInfo
						label="Production Companies"
						value={movie?.production_companies.map((c) => c.name).join(" - ")}
					/>
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={router.back}
				className="absolute right-0 bottom-5 left-0 z-50 mx-5 flex-row items-center justify-center rounded-lg bg-accent py-3.5"
			>
				<Image
					source={icons.arrow}
					className="mt-0.5 mr-1 size-5 rotate-180"
					tintColor="#ffffff"
				/>
				<Text className="font-semibold text-base text-white">Go back</Text>
			</TouchableOpacity>
		</View>
	);
}
