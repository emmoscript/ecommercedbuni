interface propsType {
    icon: React.ReactNode;
    title: string;
    desc: string;
  }
  
const FeatureCard = ({icon, title, desc}: propsType) => {
    return (
        <div className="Flex gap-2 bg-gray-100 px-4 py-6 rounded-lg">
            <div className="text-4xl">{icon}</div>
            <div>
                <h2 className="font-medium text-xl">{title}</h2>
                <p className="text-gray-600">{desc}</p>
            </div>
        </div>
    );
};
  
  
  export default FeatureCard;
  