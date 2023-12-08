// #include <bits/stdc++.h>

// using namespace std;

// void solve(int node, int n, vector<int> &visited, vector<int> adj[], vector<vector<int>> &grid, vector<vector<int>> &paths, vector<int> &path)
// {
//     if (path.size() == n)
//     {
//         // cout << "entered" << endl;
//         // if there exist a edge from last node in path to 0
//         if (grid[path.back()][0] == 1)
//         {
//             vector<int> temp = path;
//             temp.push_back(0);
//             paths.push_back(temp);
//         }
//     }

//     for (auto it : adj[node])
//     {
//         if (!visited[it]) // not already taken in path
//         {
//             visited[it] = 1;
//             path.push_back(it);
//             solve(it, n, visited, adj, grid, paths, path);
//             visited[it] = 0;
//             path.pop_back();
//         }
//     }
//     // cout << "path till now " << endl;
//     // for (int i = 0; i < path.size(); i++)
//     //     cout << path[i] << " ";
//     // cout << "run successful" << endl;
// }
// int main()
// {
//     // graph input as the n*n grid
//     int n;
//     cin >> n;
//     vector<vector<int>> grid(n, vector<int>(n));

//     for (int i = 0; i < n; i++)
//     {
//         for (int j = 0; j < n; j++)
//         {
//             cin >> grid[i][j];
//         }
//     }

//     vector<int> adj[n];

//     for (int i = 0; i < n; i++)
//     {
//         for (int j = 0; j < n; j++)
//         {
//             if (grid[i][j] == 1)
//                 adj[i].push_back(j);
//         }
//     }

//     vector<vector<int>> paths;

//     vector<int> path;
//     path.push_back(0); // let start node be 0
//     vector<int> visited(n, 0);
//     visited[0] = 1;
//     for (auto it : adj[0])
//     {
//         visited[it] = 1;
//         path.push_back(it);
//         solve(it, n, visited, adj, grid, paths, path);
//         visited[it] = 0;
//         path.pop_back();
//     }

//     cout << "hamiltonian cycles are" << endl;

//     if (paths.size() == 0)
//     {
//         cout << "no cycles" << endl;
//     }
//     else
//     {
//         for (int i = 0; i < paths.size(); i++)
//         {
//             for (int j = 0; j < paths[i].size(); j++)
//             {
//                 if (j != paths[i].size() - 1)
//                     cout << paths[i][j] << "->";
//                 else
//                     cout << paths[i][j];
//             }
//             cout << endl;
//         }
//     }

//     return 0;
// }

#include<iostream>
using namespace std;

bool isSafe(int v, bool graph[V][V], int pos, bool visited[]) {
    if (graph[pos][v] == 0)
        return false;

    if (visited[v])
        return false;

    return true;
}

bool hamCycleUtil(bool graph[V][V], int pos, bool visited[], int v) {
    if (pos == V)
        return graph[v][0];

    for (int i = 1; i < V; i++) {
        if (isSafe(i, graph, pos, visited)) {
            visited[i] = true;

            if (hamCycleUtil(graph, pos + 1, visited, i))
                return true;

            visited[i] = false;
        }
    }

    return false;
}

bool hamCycle(bool graph[V][V]) {
    bool visited[V];
    for (int i = 0; i < V; i++)
        visited[i] = false;

    visited[0] = true;

    return hamCycleUtil(graph, 1, visited, 0);
}

int main() {
    bool graph[V][V] = {{0, 1, 1, 1},
                        {1, 0, 1, 0},
                        {1, 1, 0, 1},
                        {1, 0, 1, 0}};

    if (hamCycle(graph))
        cout << "Graph contains a Hamiltonian cycle";
    else
        cout << "Graph doesn't contain a Hamiltonian cycle";

    return 0;
}