import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

const SearchBar = ({
	placeholder,
	onPress,
	value,
	onChangeText,
}: {
	placeholder: string;
	onPress?: () => void;
	value?: string;
	onChangeText?: (text: string) => void;
}) => {
	return (
		<View className="flex-row items-center rounded-full bg-dark-200 px-5 py-4">
			<Image
				source={icons.search}
				className="size-5"
				resizeMode="contain"
				tintColor="#ab8bff"
			/>
			<TextInput
				placeholder={placeholder}
				value={value}
				onPress={onPress}
				onChangeText={onChangeText}
				placeholderTextColor="#a8b5db"
				className="ml-2 flex-1 text-white"
			/>
		</View>
	);
};

export default SearchBar;
