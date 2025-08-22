// I colori sono da sistemare non appena ci arrivano i dettagli
const colorMap: { [key: string]: string } = {
  Bianco: "#FFF",
  "U-Blue": "#E2F0F9",
  "Grigio Chiaro": "#F1F1F1",
  Trasparente: "transparent",
};

type ConfigColor = {
  selected: string;
  value: string;
  category: string;
};

const defaultColor = "U-Blue";

export function colorMapper(colorMapConfig: ConfigColor[]): string {
  return stringColorToHex(colorConfigParser(colorMapConfig));
}

export function colorConfigParser(colorMapConfig: ConfigColor[]): string {
  const color = colorMapConfig.find((item) => item.selected === "true");
  return color ? color.value : defaultColor;
}

export function stringColorToHex(stringColor: string): string {
  return colorMap[stringColor] != undefined
    ? colorMap[stringColor]
    : colorMap[defaultColor];
}
