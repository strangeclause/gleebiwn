export function createXIntent(text: string) {
  return `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
}

export function createOrderIntent(
  name: string,
  price: string,
  quantity = 1
) {
  return createXIntent(
    `hi! i'd like to order ${quantity}x ${name} from gleebiwn. price: ${price}.`
  );
}

export function createQuestionIntent(question: string) {
  return createXIntent(
    `hi gleebiwn! i have a question: ${question}`
  );
}

export function createRequestIntent(request: string) {
  return createXIntent(
    `hi gleebiwn! i'd like to request something: ${request}`
  );
}