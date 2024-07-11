import { createContext, useContext } from "react"

import {
  Text,
  TextProps,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  StyleProp,
  StyleSheet,
} from "react-native"

import clsx from "clsx"

type Variants = "primary" | "secondary"

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants
  isLoading?: boolean
}

const ThemeContext = createContext<{ variant?: Variants }>({})

function Button({
  variant = "primary",
  children,
  isLoading,
  style,
  className,
  ...rest
}: ButtonProps) {

  const containerStyles: StyleProp<ViewStyle> = {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
  };

  if (variant === "primary") {
    containerStyles.backgroundColor = "#84CC16"; // Exemplo de cor para o botão primário
  } else if (variant === "secondary") {
    containerStyles.backgroundColor = "#374151"; // Exemplo de cor para o botão secundário
  }

  return (
    <TouchableOpacity
      style={[containerStyles, style]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      <ThemeContext.Provider value={{ variant }}>
        {isLoading ? (
          <ActivityIndicator color="#84CC16" />
        ) : (
          children
        )}
      </ThemeContext.Provider>
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  const { variant } = useContext(ThemeContext)

  return (
    <Text
      className={clsx("text-base font-semibold", {
        "text-lime-950": variant === "primary",
        "text-zinc-200": variant === "secondary",
      })}
    >
      {children}
    </Text>
  )
}

Button.Title = Title

export { Button }