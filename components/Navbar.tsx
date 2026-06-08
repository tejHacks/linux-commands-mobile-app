import { Ionicons } from "@expo/vector-icons"
import { usePathname, useRouter } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

type NavItem = {
  label: string
  icon: keyof typeof Ionicons.glyphMap
  activeIcon: keyof typeof Ionicons.glyphMap
  route: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Commands", icon: "terminal-outline", activeIcon: "terminal", route: "/commands" },
  { label: "Quiz", icon: "bulb-outline", activeIcon: "bulb", route: "/quiz" },
  { label: "Daily", icon: "calendar-outline", activeIcon: "calendar", route: "/daily" },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <View className="flex-row justify-around items-center w-full bg-black border-t border-green-500/30 pb-2 pt-3">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.route
        return (
          <TouchableOpacity
            key={item.route}
            className="flex-1 items-center gap-1"
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? item.activeIcon : item.icon}
              size={22}
              color={isActive ? "#22c55e" : "#4b5563"}
            />
            <Text
              className="text-xs font-medium"
              style={{ color: isActive ? "#22c55e" : "#4b5563" }}
            >
              {item.label}
            </Text>
            {isActive && (
              <View className="w-1 h-1 rounded-full bg-green-500 mt-0.5" />
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}