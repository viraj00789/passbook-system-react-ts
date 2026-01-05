import { Image, View } from "@react-pdf/renderer";
import wavy from "../../assets/wavy-lines.jpg";

const ImageSvg = () => {
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <Image key={i} src={wavy} style={{ width: "10%", height: 18 }} />
      ))}
    </View>
  );
};

export default ImageSvg;
