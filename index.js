import { Presentation } from "./Presentation.js";
import { Counter } from "./Counter.js";
import { TreeBuilder } from "./TreeBuilder.js";

window.onload = () => {
  const treeBuilder = new TreeBuilder(document);
  const presentation = new Presentation(treeBuilder);
  const counter = new Counter();
  counter.start(count => presentation.update(count));
};
