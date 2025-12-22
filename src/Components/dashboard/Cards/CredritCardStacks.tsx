"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CARDS } from "../../../../Data/creditCardData";
import type { CreditCard } from "../../../../Data/creditCardData";


const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const CardStack = () => {
  const [cards, setCards] = useState<CreditCard[]>(CARDS);

  const moveToEnd = (fromIndex: number) => {
    setCards((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.push(moved);
      return updated;
    });
  };

  return (
    <>
      <div className="w-full lg:w-[35%] flex flex-col border border-gray-200 dark:border-gray-800 rounded-3xl bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white p-4 lg:p-5">
          Accounts
        </h2>
        {/* <div className="flex items-center justify-center"> */}
        <ul className="relative h-100 lg:h-50 w-[calc(100%-100px)] flex items-center justify-center m-auto">
          {cards.map((card, index) => {
            const canDrag = index === 0;

            return (
              <motion.li
                key={card.id}
                className="absolute h-65 w-[calc(100%-20px)] list-none rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl"
                style={{
                  background: card.bgColor,
                  cursor: canDrag ? "grab" : "auto",
                  transformOrigin: "top center",
                }}
                animate={{
                  y: index * -CARD_OFFSET,
                  scale: 1 - index * SCALE_FACTOR,
                  zIndex: cards.length - index,
                }}
                drag={canDrag ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                whileDrag={{
                  scale: 1.0,
                }}
                onDragEnd={() => moveToEnd(index)}
              >
                {/* Glass overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-white/20 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileDrag={{ opacity: 1 }} // show overlay while dragging
                />

                {/* Card content */}
                <div className="relative flex h-full flex-col justify-between p-6 credit-text">
                  <div className="flex justify-between items-center">
                    <span className="text-lg tracking-widest font-bold">
                      {card.holder}
                    </span>
                    <div className="text-sm uppercase tracking-wider opacity-80">
                      <img
                        src={card.brandImage as string}
                        alt={card.accountName as string}
                        width={80}
                        height={20}
                        className="bg-transparent rounded-lg"
                      />
                    </div>
                  </div>

                  <span className="text-2xl tracking-widest font-bold">{card.number}</span>

                  <div className="flex justify-between text-sm opacity-80 credit-text">
                    <div className="flex flex-col">
                      <p className="text-xl font-bold">IFSC Code</p>
                      <p className="font-medium text-md opacity-60">{card.ifscode}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xl font-bold">Account No.</p>
                      <p className="font-medium text-md opacity-60">{card.accountNumber}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
        {/* </div> */}
      </div>
    </>
  );
};

export default CardStack;
