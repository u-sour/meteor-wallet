import { Meteor } from 'meteor/meteor';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { autorun, subscribe } from 'vue-meteor-tracker';
export interface SignInData {
  username: string;
  password: string;
}

// export interface UserData {
//   _id: string;
//   username: string;
//   email: any[];
// }

export const useAuthStore = defineStore('auth', () => {
  //state
  const _user = ref<Meteor.User>();
  //getter
  const user = computed(() => _user.value);
  //methods
  const setUser = (userId: string) => {
    try {
      Meteor.call(
        'acc.findOne',
        { _id: userId },
        (err: { reason: any }, res: Meteor.User) => {
          if (err) {
            console.log(err.reason);
            return;
          }
          _user.value = res;
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  const singIn = async (form: SignInData) => {
    return new Promise<any>((resolve, reject) => {
      const { username, password } = form;
      Meteor.loginWithPassword(username, password, (error) => {
        const userId = Meteor.userId();
        if (userId) {
          setUser(userId);
          resolve(true);
        } else {
          reject(error?.message);
        }
      });
    });
  };

  // const singOut = () => {};
  return { user, setUser, singIn };
});
