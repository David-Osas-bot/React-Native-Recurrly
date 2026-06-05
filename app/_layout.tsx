// app/_layout.tsx
import '@/global.css';
import { ClerkProvider } from '@clerk/expo';
import { Stack } from 'expo-router';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}