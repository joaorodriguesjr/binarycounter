import { Presentation } from "./Presentation";
import { Counter } from "./Counter";
import { TreeBuilder } from "./TreeBuilder";

window.onload = () => {
  const treeBuilder = new TreeBuilder(document);
  const presentation = new Presentation(treeBuilder);
  const counter = new Counter();
  counter.start(count => presentation.update(count));
};
