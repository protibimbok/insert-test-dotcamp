
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
    useInnerBlocksProps,
    store as blockEditorStore,
    BlockIcon,
} from "@wordpress/block-editor";
import metadata from './block.json';

const edit = (props) => {

    const blockProps = useBlockProps({});

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        renderAppender: false,
		template: [["create-block/blank-tmp-nested"]]
    });

	return <div style={{border: '1px solid'}}>
		<p>Tada from main</p>
		<div {...innerBlocksProps}></div>
	</div>
}

registerBlockType( metadata.name, {
	edit,
} );
