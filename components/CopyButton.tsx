import React, {useRef} from 'react';

interface CopyHTMLButtonProps {
    componentToCopy: React.ReactNode;
}

const CopyHTMLButton: React.FC<CopyHTMLButtonProps> = ({componentToCopy}) => {
    const componentRef = useRef<HTMLDivElement>(null);

    const handleCopyHTML = () => {
        if (componentRef.current) {
            const componentHTML = componentRef.current.innerHTML;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(componentHTML);
            } else {
                alert('Clipboard API not supported');
            }
        }
    };

    return (
        <div>
            <button onClick={handleCopyHTML}>Copy HTML</button>
            <div ref={componentRef}>{componentToCopy}</div>
        </div>
    );
};

export default CopyHTMLButton;
