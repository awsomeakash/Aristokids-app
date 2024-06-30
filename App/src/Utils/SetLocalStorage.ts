import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export async function setLocalStorage(formData: { [key: string]: any }, STORAGE_KEY: string) {
    try {
        console.log('formData setLocal:::::::', formData);
        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(formData),
        );
        let allKeys = await AsyncStorage.getItem("mulFormData");
        console.log('allKeys :::::::', allKeys);
    } catch (error) {
        Alert.alert('Error', 'Failed to save form data.');
    }

}

export async function getLocalStorageKey(STORAGE_KEY: string) {
    try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData);
        }
    } catch (error) {
        Alert.alert('Error', 'Failed to load saved data.');
    }
}