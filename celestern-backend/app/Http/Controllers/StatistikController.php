<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\User;
use App\Models\Komentar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistikController extends Controller
{
    public function ringkasan()
    {
        $hari = 192;
        $minggu = 852;
        $bulan = 190684;

        $totalView = Berita::sum('view');
        $bounceRate = 5; // Dummy
        $avgTime = 5; // Dummy

        $topArticles = Berita::orderByDesc('view')->limit(5)->get();

        return response()->json([
            'hari' => $hari,
            'minggu' => $minggu,
            'bulan' => $bulan,
            'total_view' => $totalView,
            'bounce_rate' => $bounceRate,
            'avg_time' => $avgTime,
            'top_articles' => $topArticles
        ]);
    }

    public function statistikBerita()
    {
        $beritas = Berita::withCount('komentar')->get();

        // Dummy grafik view harian (14 hari terakhir)
        $grafik = [];
        for ($i = 13; $i >= 0; $i--) {
            $grafik[] = [
                'tanggal' => now()->subDays($i)->format('d M'),
                'view' => rand(200, 1000)
            ];
        }

        return response()->json([
            'beritas' => $beritas,
            'grafik' => $grafik
        ]);
    }

    public function statistikJurnalis()
    {
        $jurnalis = User::where('role', 'jurnalis')->get();
        $data = [];

        foreach ($jurnalis as $j) {
            $artikel = Berita::where('penulis', $j->name)->get();
            $totalView = $artikel->sum('view');
            $avgView = $artikel->avg('view') ?? 0;
            $avgTime = 5; // Dummy
            $komentar = Komentar::whereIn('berita_id', $artikel->pluck('id'))->count();

            $data[] = [
                'nama' => $j->name,
                'artikel_terbaik' => $artikel->sortByDesc('view')->first(),
                'view' => $totalView,
                'avg_view' => $avgView,
                'avg_time_read' => $avgTime,
                'komentar' => $komentar
            ];
        }

        return response()->json(['jurnalis' => $data]);
    }
}
