interface Props {
  title: string;
  url: string;
}

function BridgeAsset({ title, url }: Props) {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <span>Bridge Asset to</span>
      <img src={url} className="pl-1 h-full" />
      <label className="pl-1 text-white">{title}</label>
    </div>
  );
}

export default BridgeAsset;
