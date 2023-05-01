import React, {ReactNode, useMemo} from "react";
import {tv} from "tailwind-variants";
import {Card, CardHeader, CardBody, LinkProps, SlotsToClasses} from "@nextui-org/react";
import {useRouter} from "next/router";
import {LinkIcon} from "@nextui-org/shared-icons";

const styles = tv({
  slots: {
    base: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
    card:
      "dark:border-none before:bg-white/5 before:backdrop-blur-lg before:backdrop-saturate-[1.8]",
    header: "gap-2 pb-0",
    iconWrapper: "flex justify-center p-2 rounded-full items-center bg-secondary-100 text-pink-500",
    title: "text-base font-semibold",
    description: "font-light text-base text-neutral-700",
  },
});

export type FeaturesGridSlots = keyof ReturnType<typeof styles>;

export interface Feature extends LinkProps {
  title: string;
  icon: ReactNode;
  description?: string;
}

interface FeaturesGridProps {
  features: Feature[];
  classNames?: SlotsToClasses<FeaturesGridSlots>;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({features, classNames, ...props}) => {
  const router = useRouter();

  const slots = useMemo(() => styles(), []);

  const handleClick = (feat: Feature) => {
    if (!feat.href) {
      return;
    }

    if (feat.isExternal) {
      window.open(feat.href, "_blank");

      return;
    }
    router.push(feat.href);
  };

  return (
    <div className={slots.base({class: classNames?.base})} {...props}>
      {features.map((feat: Feature, index: number) => (
        <Card
          key={`${feat.title}_${index}`}
          isBlurred
          className={slots.card({class: classNames?.card})}
          isPressable={!!feat.href}
          onPress={() => handleClick(feat)}
        >
          <CardHeader className={slots.header({class: classNames?.header})}>
            <div className={slots.iconWrapper({class: classNames?.iconWrapper})}>{feat.icon}</div>
            <p className={slots.title({class: classNames?.title})}>{feat.title}</p>
            {feat.isExternal && <LinkIcon className="text-white" height={18} width={18} />}
          </CardHeader>
          {feat.description && (
            <CardBody>
              <p className={slots.description({class: classNames?.description})}>
                {feat.description}
              </p>
            </CardBody>
          )}
        </Card>
      ))}
    </div>
  );
};