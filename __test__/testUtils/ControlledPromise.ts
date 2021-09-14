interface ControlledPromiseInterface {
  deferred: {
    resolve: (value?:unknown) => void,
    reject: (value?:unknown) => void,
  },
  promise: Promise<any>
}

export const getControlledPromise = (): ControlledPromiseInterface => {
  let deferred;

  const promise = new Promise((resolve, reject) => {
    deferred = { resolve, reject };
  });

  if (!deferred) return {
    deferred: ((msg) => {
      console.log(msg);

      return {
        resolve: () => {
        },
        reject: () => {
        }
      };
    })("Failed resolve deferred"), promise
  };

  return { deferred, promise };
};
