import { registerBlockType, createBlocksFromInnerBlocksTemplate } from "@wordpress/blocks";
import {
	BlockControls,
    useBlockProps,
	store as blockEditorStore,
} from "@wordpress/block-editor";
import { useDispatch, useSelect } from "@wordpress/data";
import { ToolbarDropdownMenu } from "@wordpress/components";
import { tableRowBefore, tableRowAfter, table } from "@wordpress/icons";

import metadata from "./block.json";


const edit = (props) => {
	const { insertBlocks } = useDispatch(blockEditorStore);
	const blocksProps = useBlockProps({
        renderAppender: false
    });

	const { parentId } = useSelect((select) => {
		const parentId = select(blockEditorStore).getBlockParents(props.clientId)[0];
		console.log(parentId);
		return {
			parentId
		};
	}, []);
	const addRow = () => {
		console.log("Called add row");
		insertBlocks(
			createBlocksFromInnerBlocksTemplate([
				["create-block/blank-tmp-nested"],
				["create-block/blank-tmp-nested"]
			]),
			1,
			parentId
		);
	}

	const tableControls = [
		{
			icon: tableRowBefore,
			title: "Insert row before",
			onClick: () => addRow(true),
		},
		{
			icon: tableRowAfter,
			title: "Insert row after",
			onClick: () => addRow(false),
		},
	];
	return (
		<>
			<div {...blocksProps}>This is inner</div>
			<BlockControls group="other" __experimentalShareWithChildBlocks>
				<ToolbarDropdownMenu
					hasArrowIndicator
					icon={table}
					label={"Edit table"}
					controls={tableControls}
				/>
			</BlockControls>
		</>
	);
};

registerBlockType(metadata.name, {
	edit,
});
