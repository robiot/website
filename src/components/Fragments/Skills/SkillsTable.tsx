import { LanguagesData, OtherData, TechnologiesData } from "@utils/constants";
import { cx } from "@utils/cx";
import { FadeContainer, popUp } from "@utils/framerMotionVariants";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, ReactNode } from "react";

const getItems = (itemtype: { name: string; image: string }[]) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={FadeContainer}
            viewport={{ once: true }}
        >
            {itemtype.map((item, index) => {
                return (
                    <motion.div
                        variants={popUp}
                        key={index}
                        className={cx(
                            "flex items-center gap-3 px-3 py-4 border-b-[1px]",
                            index == itemtype.length - 1
                                ? "border-transparent"
                                : "border-b-grey1"
                        )}
                    >
                        <Image
                            height={30}
                            width={30}
                            alt={item.name}
                            src={`/img/skills/${item.image}`}
                        />
                        {item.name}
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

const Column: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="flex-1 mt-10 lg:mt-0">{children}</div>;
};

const ColumnTitle: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <h4 className="text-2xl lg:text-xl text-center mb-2 lg:mb-10  text-black lg:text-white">
            {children}
        </h4>
    );
};

const Separator: FC = () => {
    return (
        <div
            className="w-[1px] bg-grey1 mx-4 mb-3 hidden lg:block"
            style={{ marginTop: "calc(5.5rem)" }}
        />
    );
};

export const SkillsTable: FC = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-items-stretch mt-0 lg:-mt-12 z-20 relative">
            <Column>
                <ColumnTitle>Languages</ColumnTitle>
                {getItems(LanguagesData)}
            </Column>

            <Separator />

            <Column>
                <ColumnTitle>Technologies</ColumnTitle>
                {getItems(TechnologiesData)}
            </Column>

            <Separator />

            <Column>
                <ColumnTitle>Others</ColumnTitle>
                {getItems(OtherData)}
            </Column>
        </div>
    );
};
