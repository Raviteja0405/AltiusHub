// sliding window median

#include<bits/stdc++.h>
using namespace std;

int main(){
    // Assuming the n - num of elements and k is window size
    int n, k;
    cin>>n>>k;
    vector<int>nums(n);

    vector<int> ans;

    for(int i=0;i<n;i++)cin>>nums[i];
    vector<int>unsorted_data, sorted_data;

    int left = 0, right =0;
    // first moving the right pointer
    for(int i =0;i<k;i++){
        unsorted_data.push_back(nums[i]);
        sorted_data.push_back(nums[i]);
        right++;
    }
    sort(sorted_data.begin(), sorted_data.end());

    while(right < n){
        ans.push_back(sorted_data[((left + right)/2)]);

        vector<int>temp;
        for(int i=1;i<unsorted_data.size();i++){
            temp.push_back(unsorted_data[i]);
        }
        temp.push_back(nums[++right]);
        sorted_data = unsorted_data;
        sort(sorted_data.begin(), sorted_data.end());

        unsorted_data = temp;
        left++;
    }
    for(int i =0;i<ans.size();i++){
        cout<<ans[i]<<" ";
    }
    cout<<endl;

    return 0;
}