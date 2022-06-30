import React, {
	useEffect, useRef,
	useState
} from "react";
import SingleItem from "./SingleItem";

type Item = {
	value: string,
	label: string
}

export type ItemArray = Item[]

type ItemsProps = {
	items:ItemArray
}

function Items({items}: ItemsProps) {
	return (
		<div className="">
			{items && items.map((item, key) => (
				<SingleItem value={item.value} key={key} label={item.label}/>
			))}
		</div>
	);
}

export default Items;