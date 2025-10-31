import { useEffect, useState } from "react";

const useFetch = <T>(fetchFn: () => Promise<T>, autoFetch = true) => {
	const [data, setData] = useState<T | null>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await fetchFn();

			setData(res);
		} catch (error) {
			setError(
				error instanceof Error ? error : new Error("An unknown error occurred"),
			);
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setData(null);
		setLoading(false);
		setError(null);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: </>
	useEffect(() => {
		if (autoFetch) {
			fetchData();
		}
	}, [autoFetch]);

	return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
