// @flow

import type { FAQType } from '../types/outputs/FAQ';
import type { ItemsType } from '../types/outputs/Results';

export type ApiResponse = {|
  id: number,
  title: string,
  content: string,
  downvotes: number,
  upvotes: number,
  categories: Array<{|
    tree_id: number,
    tree_name: string,
    items: Array<ItemsType>,
  |}>,
|};

export function sanitizeFAQ({
  id,
  title,
  content,
  categories,
  downvotes,
  upvotes,
}: ApiResponse): FAQType {
  const sanitizedCategories = categories.map(category => ({
    treeId: category.tree_id,
    treeName: category.tree_name,
    items: category.items,
  }));
  return {
    id,
    title,
    content,
    downvotes,
    upvotes,
    categories: sanitizedCategories,
  };
}
