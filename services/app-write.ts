import { Client, ID, Query, TablesDB } from "react-native-appwrite";

// Track the searches made by a user

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

const client = new Client()
	.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ?? "")
	.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ?? "");

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
	// check if a record of that search has already been stored
	// if a document is found increment the searchCount field
	//  if no document is found create a new document in Appwrite database => 1
	try {
		const result = await tablesDB.listRows({
			databaseId: DATABASE_ID ?? "",
			tableId: COLLECTION_ID ?? "",
			queries: [Query.equal("searchTerm", query)],
		});

		if (result.rows.length > 0) {
			const existingMovie = result.rows[0];

			await tablesDB.updateRow({
				databaseId: DATABASE_ID ?? "",
				tableId: COLLECTION_ID ?? "",
				rowId: existingMovie.$id,
				data: { count: existingMovie.count + 1 },
			});
		} else {
			await tablesDB.createRow({
				databaseId: DATABASE_ID ?? "",
				tableId: COLLECTION_ID ?? "",
				rowId: ID.unique(),
				data: {
					searchTerm: query,
					movie_id: movie.id,
					count: 1,
					title: movie.title,
					poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
				},
			});
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
	try {
		const result = await tablesDB.listRows({
			databaseId: DATABASE_ID ?? "",
			tableId: COLLECTION_ID ?? "",
			queries: [Query.limit(5), Query.orderDesc("count")],
		});
		return result.rows as unknown as TrendingMovie[];
	} catch (error) {
		console.error(error);
		return [];
	}
};
