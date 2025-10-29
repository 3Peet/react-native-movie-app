import { Tabs } from "expo-router";

export default function Layout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{ title: "home", headerShown: false }}
			/>
			<Tabs.Screen
				name="search"
				options={{ title: "Search", headerShown: false }}
			/>
			<Tabs.Screen
				name="saved"
				options={{ title: "Saved", headerShown: false }}
			/>
			<Tabs.Screen
				name="profile"
				options={{ title: "Profile", headerShown: false }}
			/>
		</Tabs>
	);
}
