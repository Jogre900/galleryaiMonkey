import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/home";
import { routes } from "../assets/routes";
const Stack = createStackNavigator();

export const MainNav = () => {
  return (
    <Stack.Navigator initialRouteName={routes.HOME}>
      <Stack.Screen name={routes.HOME} component={Home} />
    </Stack.Navigator>
  );
};
