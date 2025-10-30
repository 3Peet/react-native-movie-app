import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/searh-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchPopularMovies } from "@/services/api";
import useFetch from "@/services/use-fetch";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	Image,
	ScrollView,
	Text,
	View,
} from "react-native";

export default function Home() {
	const router = useRouter();
	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchPopularMovies({ query: "" }));
	return (
		<View className="flex-1 bg-primary">
			<Image source={images.bg} className="absolute z-0 w-full" />
			<ScrollView
				className="flex-1 px-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
			>
				<Image source={icons.logo} className="mx-auto mt-20 mb-5 h-10 w-12" />
				{moviesLoading ? (
					<ActivityIndicator
						size="large"
						color="#0000ff"
						className="mt-10 self-center"
					/>
				) : moviesError ? (
					<Text>Error: {moviesError?.message}</Text>
				) : (
					<View className="mt-5 flex-1">
						<SearchBar
							onPress={() => router.push("/search")}
							placeholder="Search for movies..."
						/>

						<Text className="mt-5 mb-3 font-bold text-lg text-white">
							Latest Movies
						</Text>
						<FlatList
							data={movies}
							renderItem={({ item }) => <MovieCard {...item} />}
							keyExtractor={(item) => item.id.toString()}
							numColumns={3}
							columnWrapperStyle={{
								justifyContent: "flex-start",
								gap: 20,
								paddingRight: 5,
								marginBottom: 10,
							}}
							className="mt-2 pb-32"
							scrollEnabled={false}
						/>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
