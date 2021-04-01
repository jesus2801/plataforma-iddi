export function returnImageRemoved(event: any): null | string[] {
  const differ = event.source.differ;

  // if no difference
  if (differ.isEmpty) {
    return null;
  }

  const changes = differ.getChanges({
    includeChangesInGraveyard: true,
  });

  if (changes.length === 0) {
    return null;
  }

  let hasNoImageRemoved = true;

  // check any image remove or not
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    // if image remove exists
    if (change && change.type === 'remove' && change.name === 'image') {
      hasNoImageRemoved = false;
      break;
    }
  }

  // if not image remove stop execution
  if (hasNoImageRemoved) {
    return null;
  }

  // get removed nodes
  const removedNodes = changes.filter(
    (change: any) => change.type === 'insert' && change.name === 'image',
  );

  // removed images src
  const removedImagesSrc = [];
  // removed image nodes
  const removedImageNodes = [];

  for (let i = 0, n = removedNodes.length; i < n; i++) {
    const removedNode = removedNodes[i].position.nodeAfter;
    removedImageNodes.push(removedNode);
    removedImagesSrc.push(removedNode.getAttribute('src'));
  }
  return removedImagesSrc;
}
