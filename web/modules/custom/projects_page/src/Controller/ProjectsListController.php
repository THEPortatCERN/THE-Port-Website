<?php

namespace Drupal\projects_page\Controller;

use Drupal\Core\Url;
use Drupal\Core\Controller\ControllerBase;
use Drupal\projects_page\Service\ProjectListService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ProjectsListController extends ControllerBase {

  /** @var \Drupal\project_list\Service\ProjectListService */
  protected $projectListService;

  public function __construct(ProjectListService $projectListService) {
    $this->projectListService = $projectListService;
  }

  public static function create(ContainerInterface $container) {
    return new static($container->get('project_list.list'));
  }

  public function content() {
    $page = [];

    // Preload the JSON and include it in the Drupal settings JavaScript object
    $jsonEndpointUrl = Url::fromRoute('projects_page.projects.json')->toString();
    $preload_json = [
      '#tag' => 'link',
      '#attributes' => [
        'rel' => 'preload',
        'href' => $jsonEndpointUrl,
        'as' => 'fetch',
        'crossorigin' => '',
      ],
    ];
    $page['#attached']['html_head'][] = [$preload_json, 'preload_json'];
    $page['#attached']['drupalSettings']['projects_page']['endpoint'] = $jsonEndpointUrl;

    $page['#attached']['library'][] = 'projects_page/dist';
    $page['#attached']['library'][] = 'core/drupalSettings';

    $page['#markup'] = '<div id="app"></div>';
    $page['#cache']['max-age'] = 31536000;

    return $page;
  }

  public function json() {
    return new JsonResponse($this->projectListService->getTeaserData());
  }
}
