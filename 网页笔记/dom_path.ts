
const DomFun ={
    ancestorShadowRoot(el:Node): Element|null {
        let current: (Node|null) = (el as Node | null);
        while (current) {
            if(current instanceof Element && !current.shadowRoot){
                return current
            }
            current = current.parentNode;
        }
        return null;
     },

  nodeNameInCorrectCase(el:Element): string {
    // If there is no local name, it's case sensitive
    if (!el.localName) {
      return el.nodeName;
    }

    // If the names are different lengths, there is a prefix and it's case sensitive
    if (el.localName.length !== el.nodeName.length) {
      return el.nodeName;
    }

    // Return the localname, which will be case insensitive if its an html node
    return el.localName;
  }
}




export const cssPath = function(node: Element, optimized?: boolean): string {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const steps:Step[] = [];
  let contextNode = node;
  while (contextNode) {
    const step = _cssPathStep(contextNode, Boolean(optimized), contextNode === node);
    if (!step) {
      break;
    }  // Error - bail out early.
    steps.push(step);
    if (step.optimized) {
      break;
    }
    //@ts-ignore
    contextNode = contextNode.parentElement;
  }

  steps.reverse();
  return steps.join(' > ');
};


// TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
// eslint-disable-next-line @typescript-eslint/naming-convention
export const _cssPathStep = function(node: Element, optimized: boolean, isTargetNode: boolean): Step|null {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const id = node.getAttribute('id');
  if (optimized) {
    if (id) {
      return new Step(idSelector(id), true);
    }
    const nodeNameLower = node.nodeName.toLowerCase();
    if (nodeNameLower === 'body' || nodeNameLower === 'head' || nodeNameLower === 'html') {
      return new Step(DomFun.nodeNameInCorrectCase(node), true);
    }
  }
  const nodeName = DomFun.nodeNameInCorrectCase(node);

  if (id) {
    return new Step(nodeName + idSelector(id), true);
  }
  const parent = node.parentElement;
  if (!parent || parent.nodeType === Node.DOCUMENT_NODE) {
    return new Step(nodeName, true);
  }

  function prefixedElementClassNames(node: Element): string[] {
    const classAttribute = node.getAttribute('class');
    if (!classAttribute) {
      return [];
    }

    return classAttribute.split(/\s+/g).filter(Boolean).map(function(name) {
      // The prefix is required to store "__proto__" in a object-based map.
      return '$' + name;
    });
  }

  function idSelector(id: string): string {
    return '#' + CSS.escape(id);
  }

  const prefixedOwnClassNamesArray = prefixedElementClassNames(node);
  let needsClassNames = false;
  let needsNthChild = false;
  let ownIndex = -1;
  let elementIndex = -1;
  const siblings = parent.children;
  for (let i = 0; siblings && (ownIndex === -1 || !needsNthChild) && i < siblings.length; ++i) {
    const sibling = siblings[i];
    if (sibling.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }
    elementIndex += 1;
    if (sibling === node) {
      ownIndex = elementIndex;
      continue;
    }
    if (needsNthChild) {
      continue;
    }
    if (DomFun.nodeNameInCorrectCase(sibling) !== nodeName) {
      continue;
    }

    needsClassNames = true;
    const ownClassNames = new Set<string>(prefixedOwnClassNamesArray);
    if (!ownClassNames.size) {
      needsNthChild = true;
      continue;
    }
    const siblingClassNamesArray = prefixedElementClassNames(sibling);
    for (let j = 0; j < siblingClassNamesArray.length; ++j) {
      const siblingClass = siblingClassNamesArray[j];
      if (!ownClassNames.has(siblingClass)) {
        continue;
      }
      ownClassNames.delete(siblingClass);
      if (!ownClassNames.size) {
        needsNthChild = true;
        break;
      }
    }
  }

  let result = nodeName;
  if (isTargetNode && nodeName.toLowerCase() === 'input' && node.getAttribute('type') && !node.getAttribute('id') &&
      !node.getAttribute('class')) {
    result += '[type=' + CSS.escape((node.getAttribute('type')) || '') + ']';
  }
  if (needsNthChild) {
    result += ':nth-child(' + (ownIndex + 1) + ')';
  } else if (needsClassNames) {
    for (const prefixedName of prefixedOwnClassNamesArray) {
      result += '.' + CSS.escape(prefixedName.slice(1));
    }
  }

  return new Step(result, false);
};



export class Step {
  value: string;
  optimized: boolean;
  constructor(value: string, optimized: boolean) {
    this.value = value;
    this.optimized = optimized || false;
  }

  toString(): string {
    return this.value;
  }
}
