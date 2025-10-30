import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import {
	Image,
	ImageBackground,
	type ImageSourcePropType,
	Text,
	View,
} from "react-native";

const TabIcon = ({
	focused,
	icon,
	title,
}: {
	focused: boolean;
	icon: ImageSourcePropType;
	title: string;
}) => {
	if (focused) {
		return (
			<ImageBackground
				source={images.highlight}
				className="mt-4 flex min-h-16 w-full min-w-[112px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full"
			>
				<Image source={icon} tintColor="#151312" className="size-5" />
				<Text className="ml-2 font-semibold text-base text-secondary">
					{title}
				</Text>
			</ImageBackground>
		);
	}

	return (
		<View className="mt-4 size-full items-center justify-center rounded-full">
			<Image source={icon} tintColor="#A8B5DB" />
		</View>
	);
};

export default function Layout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#0F0D23",
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
					position: "absolute",
					overflow: "hidden",
					borderWidth: 1,
					borderColor: "#0F0D23",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.home} title={"Home"} />
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.search} title={"Search"} />
					),
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					title: "Saved",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.save} title={"Saved"} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} icon={icons.person} title={"Profile"} />
					),
				}}
			/>
		</Tabs>
	);
}
