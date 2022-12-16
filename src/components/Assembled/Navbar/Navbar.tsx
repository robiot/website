/* eslint-disable sonarjs/no-identical-functions */
import { Container } from "@components/Common/Container/Container";
// import { NavLinks } from "@components/Common/NavLinks/NavLinks";
import { SiteBanner } from "@components/Common/SiteBanner/SiteBanner";
import { LinksData, LinksSection2Data } from "@utils/constants";
import { cx } from "@utils/cx";
import { FadeContainer, popUp } from "@utils/framerMotionVariants";
import { motion } from "framer-motion";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

import { Dropdown } from "./Dropdown";

const LinkItem: FC<{ link: typeof LinksData[any] }> = ({ link }) => {
    return (
        <Link href={link.to} passHref key={`link:${link.name}`}>
            <motion.div
                tabIndex={0}
                variants={popUp}
                role="button"
                className="px-3 group"
            >
                <span className="text-base text-black group-hover:border-b-blue group-hover:border-b-2">
                    {link.name}
                </span>
            </motion.div>
        </Link>
    );
};

const dropDownButtonDefaultClass =
    "origin-[left_center] transition-[transform,top,width,opacity] duration-500 absolute h-[3px] w-full bg-black"; // some weird non tailwind stuff + normal stuff

export const Navbar = () => {
    const [isTop, setIsTop] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);

    const handleScroll = () => {
        setIsTop(window.scrollY >= 10);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, []);

    return (
        <>
            <div
                className={cx(
                    "h-16 sticky top-0 left-0 z-50 transition-shadow duration-200 box-content border-b-[1px] border-transparent",
                    (isTop || dropdownActive) &&
                        "bg-grey2/10 border-b-grey/10 backdrop-blur-2xl"
                )}
            >
                <Container size="large">
                    <div className="flex justify-between items-center h-full">
                        <SiteBanner />

                        <div className="hidden md:flex">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                variants={FadeContainer}
                                viewport={{ once: true }}
                                className="flex"
                            >
                                {LinksData.map((link) => {
                                    return (
                                        <LinkItem
                                            link={link}
                                            key={`link:${link.name}`}
                                        />
                                    );
                                })}

                                <div className="bg-blue my-[0.15rem] flex-1 mx-3 w-[2px]" />

                                {LinksSection2Data.map((link) => {
                                    return (
                                        <LinkItem
                                            link={link}
                                            key={`link:${link.name}`}
                                        />
                                    );
                                })}
                            </motion.div>
                        </div>

                        <button
                            aria-label="Toggle dropdown"
                            className={
                                "flex md:hidden cursor-pointer h-5 w-6 relative"
                            }
                            onClick={() => {
                                setDropdownActive(!dropdownActive);
                            }}
                        >
                            <span
                                className={cx(
                                    dropDownButtonDefaultClass,
                                    dropdownActive && "rotate-45",
                                    "top-0"
                                )}
                            />
                            <span
                                className={cx(
                                    dropDownButtonDefaultClass,
                                    dropdownActive && "opacity-0 w-0",
                                    "top-1/2"
                                )}
                            />
                            <span
                                className={cx(
                                    dropDownButtonDefaultClass,
                                    dropdownActive && "top-[90%] -rotate-45",
                                    "top-full"
                                )}
                            />
                        </button>
                    </div>
                </Container>
            </div>

            <Dropdown
                dropdownActive={dropdownActive}
                setDropdownActive={setDropdownActive}
            />
        </>
    );
};
