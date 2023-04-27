import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const { href } = window.location;
  const hrefSplited = href.split('/in-progress');
  return (
    <>
      <button
        data-testid="share-btn"
        onClick={ () => clipboardCopy(hrefSplited[0]).then(() => {
          setCopied(true);
          console.log(hrefSplited);
        }) }
      >
        ShareButton
      </button>
      {copied && <p>Link copied!</p>}
    </>
  );
}
